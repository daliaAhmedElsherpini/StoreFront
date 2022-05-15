import express from 'express'
import cartRoutes from '../../controllers/api/cartController'
import verifyAuthToken from '../../middlewares/auth'
import cartValidation from '../../middlewares/validation/api/cart/storeOrUpdate'
const cart = express.Router()
cart.post('/', [verifyAuthToken], cartValidation, cartRoutes.addToCart)
cart.put('/', [verifyAuthToken], cartValidation, cartRoutes.update)
cart.delete('/:id', [verifyAuthToken], cartRoutes.destroy)
cart.get('/:id', [verifyAuthToken], cartRoutes.index)
export default cart
