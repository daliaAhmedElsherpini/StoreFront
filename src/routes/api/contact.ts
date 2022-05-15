import express from 'express'
import contactRoutes from '../../controllers/api/contactController'
import messageValidation from '../../middlewares/validation/api/contactMessages/store'
const contact = express.Router()
contact.post('/', messageValidation, contactRoutes.store)

export default contact
