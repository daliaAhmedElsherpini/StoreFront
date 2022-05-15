import express from 'express'
import userRoutes from '../../controllers/api/userController'
import verifyAuthToken from '../../middlewares/auth'
import updateUserValidation from '../../middlewares/validation/api/user/update'
const users = express.Router()
users.get('/:id', [verifyAuthToken], userRoutes.profile)
users.put('/:id', [verifyAuthToken], updateUserValidation, userRoutes.update)

export default users
