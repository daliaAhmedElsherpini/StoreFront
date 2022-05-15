import express from 'express'
import countryRoutes from '../../controllers/api/countriesController'
const countries = express.Router()
countries.get('/', countryRoutes.index)
countries.get('/:id', countryRoutes.show)

export default countries
