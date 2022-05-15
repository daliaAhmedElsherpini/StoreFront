import { Request, Response } from 'express'
import { productModel } from '../../models/product'
import { sendResponse, errorResponse } from '../../handlers/responses'

const model = new productModel()

// handler functions here

const index = async (req: Request, res: Response) => {
  try {
    const products = await model.get()
    res.status(200).json(sendResponse(products, 'get all products'))
  } catch (err) {
    res.status(500).json(errorResponse(`Something Went Wrong : ${err}`))
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const product = await model.find(req.params.id)
    if (product) {
      res.status(200).json(sendResponse(product, 'product details'))
      return
    }
    res.status(404).json(errorResponse('Not Found'))
  } catch (err) {
    res.status(500).json(errorResponse(`Something Went Wrong : ${err}`))
  }
}
const productRoutes = {
  index: index,
  show: show,
}
export default productRoutes
