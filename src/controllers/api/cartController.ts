import { Cart } from './../../models/cart'
import { productModel } from './../../models/product'
import { Request, Response } from 'express'
import { sendResponse, errorResponse } from '../../handlers/responses'
import { CartModel } from '../../models/cart'
import { CartHandler } from '../../handlers/cart'

const model = new CartModel()
const productmodel = new productModel()
const handler = new CartHandler()

// handler functions here

// show user cart
const index = async (req: Request, res: Response) => {
  try {
    const cart = await handler.products(req.params.id)
    res.status(200).json(sendResponse(cart, 'get all products of your cart'))
  } catch (err) {
    res.status(500).json(errorResponse(`Something Went Wrong : ${err}`))
  }
}

//add to cart
const addToCart = async (req: Request, res: Response) => {
  try {
    //check product
    const product = await productmodel.find(req.body.product_id)
    const productStock = product.stock

    //request data
    const data: Cart = {
      product_id: req.body.product_id,
      user_id: req.body.user_id,
      quantity: req.body.quantity,
      total: product.sale_price
        ? req.body.quantity * product.sale_price
        : req.body.quantity * product.price,
    }

    //work on quantity ,, if the record aleady exists into cart increase the quantity
    const record = await model.where(
      `user_id = ${req.body.user_id} AND product_id = ${req.body.product_id}`
    )
    if (record.length) {
      data.quantity = req.body.quantity + record[0].quantity
      data.id = record[0].id
      data.total = product.sale_price
        ? data.quantity * product.sale_price
        : data.quantity * product.price

      if (productStock > data.quantity) {
        await model.update(data)
        res
          .status(200)
          .json(
            sendResponse('', 'Success : the product has been added to the cart')
          )
      } else {
        res.status(200).json(errorResponse('the product is out of stock'))
      }
      return
    }

    // check stock
    if (productStock > data.quantity) {
      await model.store(data)
      res
        .status(200)
        .json(
          sendResponse('', 'Success : the product has been added to the cart')
        )
    } else {
      res.status(200).json(errorResponse('the product is out of stock'))
    }
  } catch (err) {
    res.status(500).json(errorResponse(`Something Went Wrong : ${err}`))
  }
}

// update user cart
const update = async (req: Request, res: Response) => {
  try {
    // check record in cart
    const record = await model.where(
      `user_id = ${req.body.user_id} AND product_id = ${req.body.product_id}`
    )
    if (record) {
      //check product
      const product = await productmodel.find(req.body.product_id)
      const productStock = product.stock

      //work on total
      let total = req.body.quantity * product.price
      if (product.sale_price) {
        total = req.body.quantity * product.sale_price
      }
      //request data
      const data: Cart = {
        id: record[0].id,
        product_id: req.body.product_id,
        user_id: req.body.user_id,
        quantity: req.body.quantity,
        total: total,
      }

      // check stock
      if (productStock > req.body.quantity) {
        await model.update(data)
        res
          .status(200)
          .json(sendResponse('', 'Success : the cart record has been updated'))
      } else {
        res.status(200).json(errorResponse('the product is out of stock'))
      }
    } else {
      res.status(404).json(errorResponse('this record is not found'))
    }
  } catch (err) {
    res.status(500).json(errorResponse(`Something Went Wrong : ${err}`))
  }
}

// update user cart
const destroy = async (req: Request, res: Response) => {
  try {
    //get record
    const record = await model.find(req.params.id)
    if (record) {
      await model.destroy(req.params.id)
      res
        .status(200)
        .json(
          sendResponse(
            '',
            'The product has been removed successfully from your cart'
          )
        )
      return
    }
    res.status(404).json(errorResponse('The Product Is Not Found'))
  } catch (err) {
    res.status(500).json(errorResponse(`Something Went Wrong : ${err}`))
  }
}

const cartRoutes = {
  index: index,
  addToCart: addToCart,
  destroy: destroy,
  update: update,
}
export default cartRoutes
