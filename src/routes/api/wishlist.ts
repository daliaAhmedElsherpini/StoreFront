import express from 'express'
import wishlistRoutes from '../../controllers/api/wishlistController'
import verifyAuthToken from '../../middlewares/auth'
import wishlistValidation from '../../middlewares/validation/api/wishlist/store'
const wishlist = express.Router()
wishlist.get('/:id', [verifyAuthToken], wishlistRoutes.show)
wishlist.post(
  '/',
  [verifyAuthToken],
  wishlistValidation,
  wishlistRoutes.wishlist
)

export default wishlist
