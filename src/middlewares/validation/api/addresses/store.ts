import { CountryModel } from './../../../../models/country'
import { CityModel } from './../../../../models/city'
import express from 'express'
import { UserModel } from '../../../../models/user'
const { check, validationResult } = require('express-validator')
const usermodel = new UserModel()
const citymodel = new CityModel()
const countrymodel = new CountryModel()

const addressValidation = [
  check('country_id')
    .not()
    .isEmpty()
    .withMessage('Country Id Is Required')
    .custom(async (country_id: string) => {
      const existingCountry = await countrymodel.find(country_id)

      if (!existingCountry) {
        throw new Error('Country Id Is Not Correct')
      }
    }),

  check('city_id')
    .not()
    .isEmpty()
    .withMessage('City Id Is Required')
    .custom(async (city_id: string) => {
      const existingCity = await citymodel.find(city_id)

      if (!existingCity) {
        throw new Error('City Id Is Not Correct')
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

  check('street').not().isEmpty().withMessage('Street Is Required'),
  check('flat_number').not().isEmpty().withMessage('Street Is Required'),
  check('address').not().isEmpty().withMessage('Address Is Required'),

  check('email').not().isEmpty().withMessage('Email Is Required'),

  check('phone_number').not().isEmpty().withMessage('Phone Number Is Required'),

  (req: express.Request, res: express.Response, next: () => void) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() })
    next()
  },
]

export default addressValidation
