import express from 'express'
const { check, validationResult } = require('express-validator')

const loginValidation = [
  check('email').not().isEmpty().withMessage('Email Address Is Required'),
  check('password').not().isEmpty().withMessage('Password Is Required'),

  (req: express.Request, res: express.Response, next: () => void) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() })
    next()
  },
]

export default loginValidation
