import express from 'express'
import orderRoutes from '../../controllers/api/orderController'
import verifyAuthToken from '../../middlewares/auth'
import orderValidation from '../../middlewares/validation/api/orders/store'
const orders = express.Router()
orders.get('/show/:id', [verifyAuthToken], orderRoutes.show)
orders.get('/:id', [verifyAuthToken], orderRoutes.index)
orders.post('/', [verifyAuthToken], orderValidation, orderRoutes.create)
orders.put('/:id', [verifyAuthToken], orderRoutes.cancel)

export default orders
