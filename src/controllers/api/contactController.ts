import { Request, Response } from 'express'
import { Message, ContactModel } from '../../models/contactMessage'
import { sendResponse } from '../../handlers/responses'

const model = new ContactModel()

// handler functions here
const store = async (req: Request, res: Response) => {
  const data: Message = {
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
  }
  try {
    const new_message = await model.store(data)
    res.json(
      sendResponse(new_message, 'Your Message Has Been Send Successfully')
    )
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const contactRoutes = {
  store: store,
}
export default contactRoutes
