import express from 'express'
import reviewsRoutes from '../../controllers/api/reviewController'
import verifyAuthToken from '../../middlewares/auth'
import reviewValidation from '../../middlewares/validation/api/reviews/store'
const reviews = express.Router()
reviews.post('/', [verifyAuthToken], reviewValidation, reviewsRoutes.store)
reviews.get('/:id', reviewsRoutes.index)

export default reviews
