import express from 'express'
import categoryRoutes from '../../controllers/api/categoryController'
const categories = express.Router()
categories.get('/', categoryRoutes.index)
categories.get('/:id', categoryRoutes.show)

export default categories
