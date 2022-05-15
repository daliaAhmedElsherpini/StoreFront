import { Request, Response } from 'express'
import { FaqModel } from '../../models/faq'
import { sendResponse, errorResponse } from '../../handlers/responses'

const model = new FaqModel()

// handler functions here

const index = async (req: Request, res: Response) => {
  try {
    const faqs = await model.get()
    res.status(200).json(sendResponse(faqs, 'get all faqs'))
  } catch (err) {
    res.status(500).json(errorResponse(`Something Went Wrong : ${err}`))
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const faq = await model.find(req.params.id)
    if (faq) {
      res.status(200).json(sendResponse(faq, 'faq details'))
      return
    }
    res.status(404).json(errorResponse('Not Found'))
  } catch (err) {
    res.status(500).json(errorResponse(`Something Went Wrong : ${err}`))
  }
}

const faqRoutes = {
  index: index,
  show: show,
}
export default faqRoutes
