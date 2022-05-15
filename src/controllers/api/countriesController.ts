import { CountryModel } from './../../models/country'
import { Request, Response } from 'express'
import { sendResponse, errorResponse } from '../../handlers/responses'

const model = new CountryModel()

// handler functions here

const index = async (_req: Request, res: Response) => {
  try {
    const countries = await model.get()
    res.status(200).json(sendResponse(countries, 'get all countries'))
  } catch (err) {
    res.status(500).json(errorResponse(`Something Went Wrong : ${err}`))
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const country = await model.find(req.params.id)
    if (country) {
      res.status(200).json(sendResponse(country, 'country Cities'))
      return
    }
    res.status(404).json(errorResponse('Not Found'))
  } catch (err) {
    res.status(500).json(errorResponse(`Something Went Wrong : ${err}`))
  }
}

const countryRoutes = {
  index: index,
  show: show,
}
export default countryRoutes
