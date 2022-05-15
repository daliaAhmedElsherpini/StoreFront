import express from 'express'
import { UserModel } from '../../models/user'
import { sendResponse, errorResponse } from '../../handlers/responses'
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const model = new UserModel()

// handler functions here

const login = async (req: express.Request, res: express.Response) => {
  try {
    const result = await model.where(`email = '${req.body.email}'`)
    if (
      result.length &&
      bcrypt.compareSync(
        req.body.password + process.env.PAPPER,
        result[0].password
      )
    ) {
      const user = result[0]
      const token = jwt.sign({ user: result }, process.env.TOKEN_SECRET)
      const data = {
        user: user,
        token: token,
      }
      res.status(200).json(sendResponse(data, 'You Are Now Logged In'))
    } else {
      res.status(401).json(errorResponse('Enter Valid Email and Password'))
    }
  } catch (err) {
    res.status(500).json(errorResponse(`${err}`))
  }
}

const register = async (req: express.Request, res: express.Response) => {
  const hash = bcrypt.hashSync(
    req.body.password + process.env.PAPPER,
    Number(process.env.SALT_ROUNDS)
  )

  const data = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    status: req.body.status,
    city_id: req.body.city_id,
    country_id: req.body.country_id,
    password: hash,
  }

  try {
    const user = await model.store(data)
    res.status(200).json(sendResponse(user, 'Your Account Has Been Created'))
  } catch (err) {
    res.status(500).json(errorResponse(`Something Went Wrong : ${err}` + err))
  }
}

const authRoutes = {
  login: login,
  register: register,
}
export default authRoutes
