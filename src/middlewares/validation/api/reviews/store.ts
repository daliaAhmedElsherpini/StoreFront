import express from 'express'
import { UserModel } from '../../../../models/user'
import { productModel } from '../../../../models/product'
const { check, validationResult } = require('express-validator')
const usermodel = new UserModel()
const productmodel = new productModel()

const reviewValidation = [
  check('product_id')
    .not()
    .isEmpty()
    .withMessage('Product Id Is Required')
    .custom(async (product_id: string) => {
      const existingUser = await productmodel.find(product_id)

      if (!existingUser) {
        throw new Error('Product Id Is Not Correct')
      }
    }),

  check('user_id')
    .not()
    .isEmpty()
    .withMessage('User Id Is Required')
    .custom(async (user_id: string) => {
      const existingUser = await usermodel.find(user_id)

      if (!existingUser) {
        throw new Error('User Id Is Not Correct')
      }
    }),

  check('rate')
    .not()
    .isEmpty()
    .withMessage('Rate Is Required')
    .isInt({ min: 0, max: 5 })
    .withMessage('Enter value from 0 to 5'),
  check('review')
    .not()
    .isEmpty()
    .withMessage('review Is Required')
    .isLength({ min: 25 })
    .withMessage('Minimum 25 characters required for review!'),

  (req: express.Request, res: express.Response, next: () => void) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() })
    next()
  },
]

export default reviewValidation
