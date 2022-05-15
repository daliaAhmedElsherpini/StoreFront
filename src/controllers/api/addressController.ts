import { Request, Response } from 'express'
import { userAddressModel, UserAddress } from '../../models/userAddress'
import { CountryModel } from '../../models/country'
import { CityModel } from '../../models/city'
import { sendResponse, errorResponse } from '../../handlers/responses'

const model = new userAddressModel()
const countryModel = new CountryModel()
const cityModel = new CityModel()

// handler functions here

//get all user addresses
const index = async (req: Request, res: Response) => {
  try {
    const faqs = await model.where(`user_id = ${req.params.id}`)
    res.status(200).json(sendResponse(faqs, 'get all addresses'))
  } catch (err) {
    res.status(500).json(errorResponse(`Something Went Wrong : ${err}`))
  }
}

// address details
const show = async (req: Request, res: Response) => {
  try {
    const faq = await model.find(req.params.id)
    if (faq) {
      res.status(200).json(sendResponse(faq, 'Address details'))
      return
    }
    res.status(404).json(errorResponse('Not Found'))
  } catch (err) {
    res.status(500).json(errorResponse(`Something Went Wrong : ${err}`))
  }
}

// store
const store = async (req: Request, res: Response) => {
  const city = await cityModel.find(req.body.city_id)
  const country = await countryModel.find(req.body.country_id)
  const data: UserAddress = {
    user_id: req.body.user_id,
    city: city.name,
    country: country.name,
    street: req.body.street,
    flat_number: req.body.flat_number,
    address: req.body.address,
    email: req.body.email,
    phone_number: req.body.phone_number,
  }
  try {
    const address = await model.store(data)
    res.json(sendResponse(address, 'Your Address Has Been Added Successfully'))
  } catch (err) {
    res.status(400).json(err)
  }
}

// update user address
const update = async (req: Request, res: Response) => {
  try {
    // check record in cart
    const record = await model.find(req.params.id)
    if (record) {
      const city = await cityModel.find(req.body.city_id)
      const country = await countryModel.find(req.body.country_id)
      const data: UserAddress = {
        id: Number(req.params.id),
        user_id: req.body.user_id,
        city: city.name,
        country: country.name,
        street: req.body.street,
        flat_number: req.body.flat_number,
        address: req.body.address,
        email: req.body.email,
        phone_number: req.body.phone_number,
      }

      const address = await model.update(data)
      res.json(
        sendResponse(address, 'Your Address Has Been Updated Successfully')
      )
    } else {
      res.status(404).json(errorResponse('this record is not found'))
    }
  } catch (err) {
    res.status(500).json(errorResponse(`Something Went Wrong : ${err}`))
  }
}

// delete an address
const destroy = async (req: Request, res: Response) => {
  try {
    //get record
    const record = await model.find(req.params.id)
    if (record) {
      await model.destroy(req.params.id)
      res
        .status(200)
        .json(sendResponse('', 'The Address has been removed successfully'))
      return
    }
    res.status(404).json(errorResponse('The Address Is Not Found'))
  } catch (err) {
    res.status(500).json(errorResponse(`Something Went Wrong : ${err}`))
  }
}

const addressRoutes = {
  index: index,
  show: show,
  store: store,
  update: update,
  destroy: destroy,
}
export default addressRoutes
