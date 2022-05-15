import supertest from 'supertest'
import app from '../index'
import { CountryModel, Country } from '../models/country'

const request = supertest(app)
const model = new CountryModel()

describe('Test Countries responses ', (): void => {
  describe('Test Countries endpoint responses ', (): void => {
    it('get all Countries the application', async (): Promise<void> => {
      const response = await request.get('/api/countries')
      expect(response.status).toBe(200)
    })
  })

  describe('Test Countries Model Methods ', (): void => {
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
      const data: Country = {
        name: 'Iraq',
      }
      const result = await model.store(data)
      expect(result.name).toBe('Iraq')
    })

    it('check update method', async (): Promise<void> => {
      const data: Country = {
        name: 'Iraq',
      }
      const store = await model.store(data)
      data.name = 'my Country'
      data.id = store.id
      await model.update(data)
      const result = await model.find(store.id as unknown as string)
      expect(result.name).toBe('my Country')
    })

    it('check delete method', async (): Promise<void> => {
      const data: Country = {
        name: 'Iraq',
      }
      const store = await model.store(data)
      const result = await model.destroy(store.id as unknown as string)
      expect(typeof result).toBe('object')
    })
  })
})
