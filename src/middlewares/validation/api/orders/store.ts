import express from 'express'
import { UserModel } from '../../../../models/user'
import { userAddressModel } from '../../../../models/userAddress'
const { check, validationResult } = require('express-validator')
const usermodel = new UserModel()
const addressmodel = new userAddressModel()

const orderValidation = [
  check('user_id')
    .not()
    .isEmpty()
    .withMessage('user Id Is Required')
    .custom(async (user_id: string) => {
      const existingOrder = await usermodel.find(user_id)

      if (!existingOrder) {
        throw new Error('User Id Is Not Correct')
      }
    }),

  check('address_id')
    .not()
    .isEmpty()
    .withMessage('address Id Is Required')
    .custom(async (address_id: string) => {
      const existingOrder = await addressmodel.find(address_id)

      if (!existingOrder) {
        throw new Error('Address Id Is Not Correct')
      }
    }),

  check('payment_method')
    .not()
    .isEmpty()
    .withMessage('payment_method Is Required'),
  (req: express.Request, res: express.Response, next: () => void) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() })
    next()
  },
]

export default orderValidation
