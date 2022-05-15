import express from 'express'
import faqs from './api/faqs'
import contact from './api/contact'
import products from './api/products'
import auth from './api/auth'
import reviews from './api/reviews'
import categories from './api/categories'
import countries from './api/countries'
import wishlist from './api/wishlist'
import appInfo from './api/app_info'
import cart from './api/cart'
import address from './api/userAddress'
import orders from './api/orders'
import users from './api/users'

const apiRoutes = express.Router()

apiRoutes.get('/', (_req, res) => {
  res.json('Welcome TTo Our Store')
})

//api routes
apiRoutes.use('/faqs', faqs)
apiRoutes.use('/products', products)
apiRoutes.use('/contact', contact)
apiRoutes.use('/reviews', reviews)
apiRoutes.use('/auth', auth)
apiRoutes.use('/categories', categories)
apiRoutes.use('/countries', countries)
apiRoutes.use('/wishlist', wishlist)
apiRoutes.use('/appinfo', appInfo)
apiRoutes.use('/cart', cart)
apiRoutes.use('/user-addresses', address)
apiRoutes.use('/orders', orders)
apiRoutes.use('/user', users)

export default apiRoutes
