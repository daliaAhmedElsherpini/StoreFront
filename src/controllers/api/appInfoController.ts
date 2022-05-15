import { Request, Response } from 'express'
import { sendResponse, errorResponse } from '../../handlers/responses'
import { AppInfoModel } from '../../models/appInfo'

const model = new AppInfoModel()

// handler functions here

const index = async (_req: Request, res: Response) => {
  try {
    const info = await model.get()
    res.status(200).json(sendResponse(info, 'get all application information'))
  } catch (err) {
    res.status(500).json(errorResponse(`Something Went Wrong : ${err}`))
  }
}

const appInfoRoutes = {
  index: index,
}
export default appInfoRoutes
