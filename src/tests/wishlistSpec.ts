import supertest from 'supertest'
import app from '../index'
import { WishlistModel, Wishlist } from '../models/wishlist'

const request = supertest(app)
const model = new WishlistModel()
describe('Test Wishlist endpoint responses ', (): void => {
  describe('Test Wishlist endpoint responses ', (): void => {
    let token = ''

    beforeAll(async (): Promise<void> => {
      const data = {
        email: 'daliaahmed@gmail.com',
        password: 'dalia123',
      }
      const response = await request
        .post('/api/auth/login')
        .set('Content-type', 'application/json')
        .send(data)
      token = response.body.data.token
    })

    // get all wishlist products of a user with id 1
    it('get all wishlist products of a user with id 1', async (): Promise<void> => {
      const response = await request
        .get('/api/wishlist/1')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200)
    })

    // add or remove from wishlist
    it('add or remove from wishlist', async (): Promise<void> => {
      const data = {
        user_id: 1,
        product_id: 1,
      }
      const response = await request
        .post('/api/wishlist')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(data)
      expect(response.status).toBe(200)
    })

    // add or remove from wishlist with wrong user id
    it('add or remove from wishlist with wrong user_id', async (): Promise<void> => {
      const data = {
        user_id: 1777,
        product_id: 1,
      }
      const response = await request
        .post('/api/wishlist')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(data)
      expect(response.status).toBe(422)
    })

    // add or remove from wishlist with wrong product id
    it('add or remove from wishlist with wrong user_id', async (): Promise<void> => {
      const data = {
        user_id: 1,
        product_id: 188888,
      }
      const response = await request
        .post('/api/wishlist')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(data)
      expect(response.status).toBe(422)
    })
  })

  describe('Test Wishlist Model Methods ', (): void => {
    it('check get method', async (): Promise<void> => {
      const result = await model.get()
      expect(typeof result).toBe('object')
    })

    it('check find method to be object', async (): Promise<void> => {
      const data: Wishlist = {
        user_id: 1,
        product_id: 1,
      }
      const store = await model.store(data)
      const result = await model.find(store.id as unknown as string)
      await model.destroy(store.id as unknown as string)
      expect(typeof result).toBe('object')
    })

    it('check find method id to be as expexted id', async (): Promise<void> => {
      const data: Wishlist = {
        user_id: 1,
        product_id: 1,
      }
      const store = await model.store(data)
      const result = await model.find(store.id as unknown as string)
      await model.destroy(store.id as unknown as string)
      expect(result.id).toBe(store.id)
    })

    it('check store method', async (): Promise<void> => {
      const data: Wishlist = {
        user_id: 1,
        product_id: 1,
      }
      const result = await model.store(data)
      const user_id = result.user_id.toString()
      expect(user_id).toBe('1')
    })

    it('check delete method', async (): Promise<void> => {
      const data: Wishlist = {
        user_id: 1,
        product_id: 1,
      }
      const store = await model.store(data)
      const result = await model.destroy(store.id as unknown as string)
      expect(typeof result).toBe('object')
    })
  })
})
