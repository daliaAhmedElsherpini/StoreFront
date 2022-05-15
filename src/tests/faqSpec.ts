import supertest from 'supertest'
import app from '../index'
import { FaqModel, Faq } from '../models/faq'

const model = new FaqModel()
const request = supertest(app)
describe("Test FAQ's responses ", (): void => {
  describe("Test FAQ's endpoint responses ", (): void => {
    it('check get all FAQS about the application', async (): Promise<void> => {
      const response = await request.get('/api/faqs')
      expect(response.status).toBe(200)
    })

    // check with valid id
    it('check get details of the FAQ with its id', async (): Promise<void> => {
      const response = await request.get('/api/faqs/1')
      expect(response.status).toBe(200)
    })

    // check with invalid id
    it('check get details of the FAQ with wrong id', async (): Promise<void> => {
      const response = await request.get('/api/faqs/1000')
      expect(response.status).toBe(404)
    })
  })

  describe("Test FAQ's Model Methods ", (): void => {
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
      const data: Faq = {
        question: 'how are you',
        answer: 'good',
      }
      const result = await model.store(data)
      expect(result.answer).toBe('good')
    })

    it('check update method', async (): Promise<void> => {
      const data: Faq = {
        question: 'how are you',
        answer: 'good',
      }
      const store = await model.store(data)
      data.answer = 'fine'
      data.id = store.id
      await model.update(data)
      const result = await model.find(store.id as unknown as string)

      expect(result.answer).toBe('fine')
    })

    it('check delete method', async (): Promise<void> => {
      const data: Faq = {
        question: 'how are you',
        answer: 'good',
      }
      const store = await model.store(data)
      const result = await model.destroy(store.id as unknown as string)
      expect(typeof result).toBe('undefined')
    })
  })
})
