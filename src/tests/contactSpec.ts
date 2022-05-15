import supertest from 'supertest'
import app from '../index'
import { ContactModel, Message } from '../models/contactMessage'

const model = new ContactModel()
const request = supertest(app)
describe('Test Contact Messages', (): void => {
  describe('Test Contact Messages endpoint responses ', (): void => {
    //check send contact message with no errors
    it('Send a Contact Message with no validation errors', async (): Promise<void> => {
      const data = {
        name: 'dalia',
        email: 'dalia@gmail.com',
        subject: 'title',
        message:
          'nice message from me to your application ,, your products are amazing',
      }
      const response = await request
        .post('/api/contact')
        .set('Content-type', 'application/json')
        .send(data)
      expect(response.status).toBe(200)
    })

    //check send contact message with errors
    it('Send a Contact Message  with message text validation error', async (): Promise<void> => {
      const response = await request
        .post('/api/contact')
        .set('Content-type', 'application/json')
        .send({
          name: 'dalia',
          email: 'dalia@gmail.com',
          subject: 'title',
          message: 'nice',
        })
      expect(response.status).toBe(422)
    })

    //check send contact message without name field
    it('Send a Contact Message  without name feild (validation)', async (): Promise<void> => {
      const response = await request
        .post('/api/contact')
        .set('Content-type', 'application/json')
        .send({
          email: 'dalia@gmail.com',
          subject: 'title',
          message: 'nice',
        })
      expect(response.status).toBe(422)
    })

    //check send contact message without email field
    it('Send a Contact Message  without email field (validation)', async (): Promise<void> => {
      const response = await request
        .post('/api/contact')
        .set('Content-type', 'application/json')
        .send({
          name: 'dalia',
          subject: 'title',
          message: 'nice',
        })
      expect(response.status).toBe(422)
    })

    //check send contact message without subject field
    it('Send a Contact Message  without subject field (validation)', async (): Promise<void> => {
      const response = await request
        .post('/api/contact')
        .set('Content-type', 'application/json')
        .send({
          name: 'dalia',
          email: 'dalia@gmail.com',
          message: 'nice',
        })
      expect(response.status).toBe(422)
    })

    //check send contact message without message field
    it('Send a Contact Message  without message field ( validation )', async (): Promise<void> => {
      const response = await request
        .post('/api/contact')
        .set('Content-type', 'application/json')
        .send({
          name: 'dalia',
          email: 'dalia@gmail.com',
          subject: 'title',
        })
      expect(response.status).toBe(422)
    })
  })

  describe('Test ContactModel Methods ', (): void => {
    it('check get method', async (): Promise<void> => {
      const result = await model.get()
      expect(typeof result).toBe('object')
    })

    it('check find method to be object', async (): Promise<void> => {
      const result = await model.find('1')
      expect(typeof result).toBe('object')
    })

    it('check find method id to be 1', async (): Promise<void> => {
      const result = await model.find('1')
      expect(result.id).toBe(1)
    })

    it('check store method', async (): Promise<void> => {
      const data: Message = {
        name: 'dalia',
        email: 'dalia@dalia',
        subject: 'title',
        message: 'hello',
      }
      const result = await model.store(data)
      expect(result.name).toBe('dalia')
    })

    it('check update method', async (): Promise<void> => {
      const data: Message = {
        name: 'dalia',
        email: 'dalia@dalia',
        subject: 'title',
        message: 'hello',
      }
      const store = await model.store(data)
      data.name = 'doaa'
      data.id = store.id
      await model.update(data)
      const result = await model.find(store.id as unknown as string)
      expect(result.name).toBe('doaa')
    })

    it('check delete method', async (): Promise<void> => {
      const data: Message = {
        name: 'dalia',
        email: 'dalia@dalia',
        subject: 'title',
        message: 'hello',
      }
      const store = await model.store(data)
      const result = await model.destroy(store.id as unknown as string)
      expect(typeof result).toBe('object')
    })
  })
})
