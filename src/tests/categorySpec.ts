import supertest from 'supertest'
import app from '../index'
import { CategoryModel, Category } from '../models/category'

const request = supertest(app)
const model = new CategoryModel()
describe('Test Categories  responses ', (): void => {
  describe('Test Categories endpoint responses ', (): void => {
    it('get all categories of the application', async (): Promise<void> => {
      const response = await request.get('/api/categories')
      expect(response.status).toBe(200)
    })

    // check with valid id
    it('check get details of the category with its id', async (): Promise<void> => {
      const response = await request.get('/api/categories/1')
      expect(response.status).toBe(200)
    })

    // check with invalid id
    it('check get details of thecategory with wrong id', async (): Promise<void> => {
      const response = await request.get('/api/categories/1000')
      expect(response.status).toBe(404)
    })
  })

  describe('Test Categories Model Methods ', (): void => {
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
      const data: Category = {
        name: 'title',
        description: 'good',
        image: 'new-image.png',
      }
      const result = await model.store(data)
      expect(result.image).toBe('new-image.png')
    })

    it('check update method', async (): Promise<void> => {
      const data: Category = {
        name: 'title',
        description: 'good',
        image: 'new-image.png',
      }
      const store = await model.store(data)
      data.name = 'my category'
      data.id = store.id
      await model.update(data)
      const result = await model.find(store.id as unknown as string)
      expect(result.name).toBe('my category')
    })

    it('check delete method', async (): Promise<void> => {
      const data: Category = {
        name: 'title',
        description: 'good',
        image: 'new-image.png',
      }
      const store = await model.store(data)
      const result = await model.destroy(store.id as unknown as string)
      expect(typeof result).toBe('undefined')
    })
  })
})
