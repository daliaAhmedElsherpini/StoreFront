import express from 'express'
import { errorResponse } from '../handlers/responses'
const jwt = require('jsonwebtoken')

const verifyAuthToken = (
  req: express.Request,
  res: express.Response,
  next: () => void
): void => {
  const authorizationHeader = req.headers.authorization
  const token = authorizationHeader?.split(' ')[1]
  try {
    jwt.verify(token, process.env.TOKEN_SECRET)
    next()
  } catch (error) {
    res
      .status(401)
      .json(
        errorResponse(
          'Invalid Token ,, you have to be loggedin to visit this url'
        )
      )
    return
  }
}

export default verifyAuthToken
