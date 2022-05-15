import express from 'express'
import authRoutes from '../../controllers/api/authController'
import registerValidation from '../../middlewares/validation/api/auth/register'
import loginValidation from '../../middlewares/validation/api/auth/login'
const auth = express.Router()
auth.post('/register', registerValidation, authRoutes.register)
auth.post('/login', loginValidation, authRoutes.login)

export default auth
