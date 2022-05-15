import supertest from 'supertest'
import app from '../index'
import { CartModel, Cart } from '../models/cart'

const request = supertest(app)
const model = new CartModel()

describe('Test Cart ', (): void => {
  describe('Test Cart endpoint responses ', (): void => {
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

    // get all cart products of a user with id 1
    it('get all cart products of a user with id 1', async (): Promise<void> => {
      const response = await request
        .get('/api/cart/1')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200)
    })

    // add to cart
    it('add to cart', async (): Promise<void> => {
      const data = {
        user_id: 1,
        product_id: 1,
        quantity: 2,
      }
      const response = await request
        .post('/api/cart')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(data)
      expect(response.status).toBe(200)
    })

    // remove from cart  using cart record id
    it('remove from cart', async (): Promise<void> => {
      const response = await request
        .get('/api/cart/1')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200)
    })

    // update cart
    it('update', async (): Promise<void> => {
      const data = {
        user_id: 1,
        product_id: 1,
        quantity: 5,
      }
      const response = await request
        .put('/api/cart')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(data)
      expect(response.status).toBe(200)
    })

    describe('Cart Validation', (): void => {
      // validate user id
      it('validate user id  is right ', async (): Promise<void> => {
        const data = {
          user_id: 1777777,
          product_id: 1,
          quantity: 5,
        }
        const response = await request
          .post('/api/cart')
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send(data)
        expect(response.status).toBe(422)
      })

      // validate user_id
      it('valiade required user_id ', async (): Promise<void> => {
        const data = {
          product_id: 1,
          quantity: 5,
        }
        const response = await request
          .post('/api/cart')
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send(data)
        expect(response.status).toBe(422)
      })

      // valiadate product id is right
      it('validate product id is right', async (): Promise<void> => {
        const data = {
          user_id: 1,
          product_id: 177777777,
          quantity: 5,
        }
        const response = await request
          .post('/api/cart')
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send(data)
        expect(response.status).toBe(422)
      })

      // validate product id is required
      it('validate product id is required ', async (): Promise<void> => {
        const data = {
          user_id: 1,
          quantity: 5,
        }
        const response = await request
          .post('/api/cart')
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send(data)
        expect(response.status).toBe(422)
      })

      // validate  quantity is required
      it('alidate  quantity is required', async (): Promise<void> => {
        const data = {
          user_id: 1,
          product_id: 1,
        }
        const response = await request
          .post('/api/cart')
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send(data)
        expect(response.status).toBe(422)
      })

      // validate  quantity is right
      it('validate  quantity is right', async (): Promise<void> => {
        const data = {
          user_id: 1,
          product_id: 1,
          quantity: 0,
        }
        const response = await request
          .post('/api/cart')
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send(data)
        expect(response.status).toBe(422)
      })
    })
  })

  describe('Test Cart Model Methods ', (): void => {
    it('check get method', async (): Promise<void> => {
      const result = await model.get()
      expect(typeof result).toBe('object')
    })

    it('check find method to be object', async (): Promise<void> => {
      const data: Cart = {
        user_id: 1,
        product_id: 1,
        quantity: 2,
        total: 45,
      }
      const record = await model.store(data)
      const result = await model.find(record.id as unknown as string)
      await model.destroy(record.id as unknown as string)
      expect(typeof result).toBe('object')
    })

    it('check find method id to be 1', async (): Promise<void> => {
      const data: Cart = {
        user_id: 1,
        product_id: 1,
        quantity: 2,
        total: 45,
      }
      const record = await model.store(data)
      const result = await model.find(record.id as unknown as string)
      expect(result.id).toBe(record.id)
    })

    it('check store method', async (): Promise<void> => {
      const data: Cart = {
        user_id: 1,
        product_id: 1,
        quantity: 2,
        total: 45,
      }
      const result = await model.store(data)
      await model.destroy(result.id as unknown as string)
      expect(result.total).toBe(45)
    })

    it('check update method', async (): Promise<void> => {
      const data: Cart = {
        user_id: 1,
        product_id: 1,
        quantity: 2,
        total: 45,
      }
      const store = await model.store(data)
      data.total = 33
      data.id = store.id
      await model.update(data)
      const result = await model.find(store.id as unknown as string)
      await model.destroy(result.id as unknown as string)
      expect(result.total).toBe(33)
    })

    it('check delete method', async (): Promise<void> => {
      const data: Cart = {
        user_id: 1,
        product_id: 1,
        quantity: 2,
        total: 45,
      }
      const store = await model.store(data)
      const result = await model.destroy(store.id as unknown as string)
      expect(typeof result).toBe('undefined')
    })
  })
})
