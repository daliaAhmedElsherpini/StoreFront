import express from 'express'
import { UserModel } from '../../../../models/user'
const { check, validationResult } = require('express-validator')
const model = new UserModel()

const registerValidation = [
  check('name')
    .not()
    .isEmpty()
    .withMessage('User Name Is Required')
    .isLength({ min: 5 })
    .withMessage('Minimum 5 characters required!'),

  check('email')
    .isEmail()
    .withMessage('Enter Valid Email Address')
    .not()
    .isEmpty()
    .withMessage('Email Address Is Required')
    .custom(async (email: string) => {
      const existingUser = await model.where(`email = '${email}'`)

      if (existingUser.length) {
        throw new Error('Email is already Exist')
      }
    }),
  check('phone')
    .not()
    .isEmpty()
    .withMessage('Phone Number Is Required')
    .custom(async (phone: string) => {
      const existingUser = await model.where(`phone = '${phone}'`)

      if (existingUser.length) {
        throw new Error('Phone Number is already Exist ')
      }
    }),

  check('password').not().isEmpty().withMessage('Password Is Required'),

  check('country_id').not().isEmpty().withMessage('Please Choose a Country'),

  check('city_id').not().isEmpty().withMessage('Please Choose a City'),

  (req: express.Request, res: express.Response, next: () => void) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() })
    next()
  },
]

export default registerValidation
