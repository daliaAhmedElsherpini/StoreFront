import { Wishlist } from './../../models/wishlist'
import { Request, Response } from 'express'
import { UserModel } from '../../models/user'
import { WishlistModel } from '../../models/wishlist'
import { WishlistHandler } from '../../handlers/wishlist'
import { sendResponse, errorResponse } from '../../handlers/responses'

const handler = new WishlistHandler()
const userModel = new UserModel()
const model = new WishlistModel()

// handler functions here

//user wish list
const show = async (req: Request, res: Response) => {
  try {
    const user = await userModel.find(req.params.id)
    if (user) {
      const wishlist = await handler.details(req.params.id)
      res.status(200).json(sendResponse(wishlist, 'Wish List Product'))
      return
    }
    res.status(404).json(errorResponse('User Id Is Not Correct'))
  } catch (err) {
    res.status(500).json(errorResponse(`Something Went Wrong : ${err}`))
  }
}

//add / remove from wish list
const wishlist = async (req: Request, res: Response) => {
  try {
    const data: Wishlist = {
      product_id: req.body.product_id,
      user_id: req.body.user_id,
    }

    const record = await model.where(
      `product_id = ${req.body.product_id} AND user_id = ${req.body.user_id}`
    )
    if (record[0]) {
      await model.destroy(record[0].id as unknown as string)
      res.json(
        sendResponse(
          '',
          'Success : The Product Has Been Removed From Your Wishlist'
        )
      )
      return
    }
    await model.store(data)
    res.json(sendResponse('', 'Success : The Product Has Been Added'))
  } catch (err) {
    res.status(500).json(errorResponse(`Something Went Wrong : ${err}`))
  }
}

const wishlistRoutes = {
  wishlist: wishlist,
  show: show,
}
export default wishlistRoutes
