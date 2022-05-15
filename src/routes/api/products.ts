import express from 'express'
import productRoutes from '../../controllers/api/productController'
const products = express.Router()
products.get('/', productRoutes.index)
products.get('/:id', productRoutes.show)

export default products
