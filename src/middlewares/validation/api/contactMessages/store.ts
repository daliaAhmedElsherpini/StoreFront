import express from 'express'
const { check, validationResult } = require('express-validator')

const messageValidation = [
  check('name').not().isEmpty().withMessage('name Is Required'),
  check('email')
    .isEmail()
    .withMessage('Enter Valid Email Address')
    .not()
    .isEmpty()
    .withMessage('email Is Required'),

  check('subject').not().isEmpty().withMessage('subject Is Required'),

  check('message')
    .not()
    .isEmpty()
    .withMessage('message Is Required')
    .isLength({ min: 15 })
    .withMessage('Minimum 15 characters required for review!'),

  (req: express.Request, res: express.Response, next: () => void) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() })
    next()
  },
]

export default messageValidation
