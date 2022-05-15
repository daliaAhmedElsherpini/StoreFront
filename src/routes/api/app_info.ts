import express from 'express'
import appInfoRoutes from '../../controllers/api/appInfoController'
const appInfo = express.Router()
appInfo.get('/', appInfoRoutes.index)

export default appInfo
