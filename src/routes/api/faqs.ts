import express from 'express'
import faqRoutes from '../../controllers/api/faqController'
const faqs = express.Router()
faqs.get('/', faqRoutes.index)
faqs.get('/:id', faqRoutes.show)

export default faqs
