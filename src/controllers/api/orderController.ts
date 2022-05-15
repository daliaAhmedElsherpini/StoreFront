import { Request, Response } from 'express'
import { Order, OrderModel } from '../../models/order'
import { sendResponse, errorResponse } from '../../handlers/responses'
import { CartHandler } from '../../handlers/cart'
import { userAddressModel } from '../../models/userAddress'

const model = new OrderModel()
const cartHandler = new CartHandler()
const addressModel = new userAddressModel()
//get all user orders
const index = async (req: Request, res: Response) => {
  try {
    const faqs = await model.where(`user_id = ${req.params.id}`)
    res.status(200).json(sendResponse(faqs, 'get all user orders'))
  } catch (err) {
    res.status(500).json(errorResponse(`Something Went Wrong : ${err}`))
  }
}

//show order details
const show = async (req: Request, res: Response) => {
  try {
    const faq = await model.find(req.params.id)
    if (faq) {
      res.status(200).json(sendResponse(faq, 'order details'))
      return
    }
    res.status(404).json(errorResponse('Not Found'))
  } catch (err) {
    res.status(500).json(errorResponse(`Something Went Wrong : ${err}`))
  }
}

//add an order
const create = async (req: Request, res: Response) => {
  try {
    const products = await cartHandler.products(req.body.user_id)
    if (products.length) {
      const address = await addressModel.find(req.body.address_id)
      const getTotal = await cartHandler.total(req.body.user_id)
      const sub_total = Number(getTotal[0].total)
      const vat = Number(sub_total) * 0.05
      const total = sub_total + vat

      const data: Order = {
        order_number: Math.random() * 10,
        products: JSON.stringify(products),
        address: JSON.stringify(address),
        payment_method: req.body.payment_method,
        vat: vat,
        status: 'waiting',
        sub_total: sub_total,
        total: Number(total),
        user_id: req.body.user_id,
      }

      const order = await model.store(data)
      // empty cart here
      await cartHandler.deleteWhere(`user_id = ${req.body.user_id}`)
      res.status(200).json(sendResponse(order, 'order added successfully'))
    } else {
      res.status(200).json(errorResponse('No Products Inside The Cart'))
    }
  } catch (err) {
    res.status(500).json(errorResponse(`Something Went Wrong : ${err}`))
  }
}

//cancel order
const updateStatus = async (req: Request, res: Response) => {
  try {
    const order = await model.find(req.params.id)
    if (order) {
      const result = await model.update('cancel', Number(req.params.id))
      res
        .status(200)
        .json(sendResponse(result, 'Your Order Has Been Cancelled'))
      return
    }
    res.status(404).json(errorResponse('Not Found'))
  } catch (err) {
    res.status(500).json(errorResponse(`Something Went Wrong : ${err}`))
  }
}

const orderRoutes = {
  index: index,
  show: show,
  create: create,
  cancel: updateStatus,
}
export default orderRoutes
