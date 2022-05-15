import { ReviewModel, Review } from './../../models/review'
import { Request, Response } from 'express'
import { sendResponse, errorResponse } from '../../handlers/responses'

const model = new ReviewModel()

// get all product reviews
const index = async (req: Request, res: Response) => {
  try {
    const product = await model.where(`product_id = ${req.params.id}`)
    if (product) {
      res.status(200).json(sendResponse(product, 'all product reviews'))
      return
    }
    res.status(404).json(errorResponse('Not Found'))
  } catch (err) {
    res.status(500).json(errorResponse(`Something Went Wrong : ${err}`))
  }
}

//add review to product
const store = async (req: Request, res: Response) => {
  const data: Review = {
    product_id: req.body.product_id,
    user_id: req.body.user_id,
    rate: req.body.rate,
    review: req.body.review,
  }
  try {
    const new_review = await model.store(data)
    res.json(sendResponse(new_review, 'Your Review Has Been Send Successfully'))
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const reviewsRoutes = {
  index: index,
  store: store,
}
export default reviewsRoutes
