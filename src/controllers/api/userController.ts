import { Request, Response } from 'express'
import { UserModel, User } from '../../models/user'
import { sendResponse, errorResponse } from '../../handlers/responses'
const bcrypt = require('bcrypt')

const model = new UserModel()

// handler functions here
const show = async (req: Request, res: Response) => {
  try {
    const faq = await model.find(req.params.id)
    if (faq) {
      res.status(200).json(sendResponse(faq, 'User Profile'))
      return
    }
    res.status(404).json(errorResponse('Not Found'))
  } catch (err) {
    res.status(500).json(errorResponse(`Something Went Wrong : ${err}`))
  }
}

// update user address
const update = async (req: Request, res: Response) => {
  try {
    // check record in cart
    const record = await model.find(req.params.id)

    if (record) {
      const hash = bcrypt.hashSync(
        req.body.password + process.env.PAPPER,
        Number(process.env.SALT_ROUNDS)
      )

      const data: User = {
        id: Number(req.params.id),
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        status: record.status,
        city_id: Number(req.body.city_id),
        country_id: Number(req.body.country_id),
        password: hash,
      }

      const result = await model.update(data)
      res.json(
        sendResponse(result, 'Your profile Has Been Updated Successfully')
      )
    } else {
      res.status(404).json(errorResponse('this record is not found'))
    }
  } catch (err) {
    res.status(500).json(errorResponse(`Something Went Wrong : ${err}`))
  }
}

const userRoutes = {
  profile: show,
  update: update,
}
export default userRoutes
