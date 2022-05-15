import express from 'express'
import addressRoutes from '../../controllers/api/addressController'
import verifyAuthToken from '../../middlewares/auth'
import addressValidation from '../../middlewares/validation/api/addresses/store'
const address = express.Router()
address.get('/show/:id', [verifyAuthToken], addressRoutes.show)
address.get('/:id', [verifyAuthToken], addressRoutes.index)
address.post('/', [verifyAuthToken], addressValidation, addressRoutes.store)
address.put('/:id', [verifyAuthToken], addressValidation, addressRoutes.update)
address.delete('/:id', [verifyAuthToken], addressRoutes.destroy)

export default address
