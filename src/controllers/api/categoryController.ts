import { CategoryModel } from './../../models/category'
import { Request, Response } from 'express'
import { sendResponse, errorResponse } from '../../handlers/responses'
import { CategoryHandler } from '../../handlers/category'

const model = new CategoryModel()
const handler = new CategoryHandler()

// handler functions here

const index = async (_req: Request, res: Response) => {
  try {
    const categories = await model.get()
    res.status(200).json(sendResponse(categories, 'get all categories'))
  } catch (err) {
    res.status(500).json(errorResponse(`Something Went Wrong : ${err}`))
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const category = await model.find(req.params.id)
    if (category) {
      await handler.details(req.params.id)
      res.status(200).json(sendResponse(category, 'category details'))
      return
    }
    res.status(404).json(errorResponse('Not Found'))
  } catch (err) {
    res.status(500).json(errorResponse(`Something Went Wrong : ${err}`))
  }
}

const categoryRoutes = {
  index: index,
  show: show,
}
export default categoryRoutes
