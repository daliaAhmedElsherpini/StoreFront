import supertest from 'supertest'
import app from '../index'
import { OrderModel, Order } from '../models/order'

const request = supertest(app)
const model = new OrderModel()

describe('Test Orders', (): void => {
  describe('Test Order endpoint responses ', (): void => {
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

    // get all Order products of a user with id 1
    it('get all Order products of a user with id 1', async (): Promise<void> => {
      const data: Order = {
        user_id: 1,
        products:
          'id:1,title:plapalapal,description:pl1p1l1p1,price:200,sale_price:100,stock:10',
        payment_method: 'cash',
        vat: 10,
        status: 'waiting',
        sub_total: 100,
        total: 110,
        address: 'plapallapala',
        order_number: 976767867,
      }
      const record = await model.store(data)
      const result = await model.find(record.id as unknown as string)

      const response = await request
        .get(`/api/orders/${record.id}`)
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200)

      await model.destroy(result.id as unknown as string)
    })

    // add to Order
    it('add an  order', async (): Promise<void> => {
      const data = {
        user_id: 1,
        address_id: 1,
        payment_method: 'cash',
      }
      const response = await request
        .post('/api/orders')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(data)
      expect(response.status).toBe(200)
    })

    describe('Order Validation', (): void => {
      // validate user id
      it('validate user id  is right ', async (): Promise<void> => {
        const data = {
          user_id: 1777777,
          address_id: 1,
          payment_method: 'cash',
        }
        const response = await request
          .post('/api/orders')
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send(data)
        expect(response.status).toBe(422)
      })

      it('validate address id  is right ', async (): Promise<void> => {
        const data = {
          user_id: 1,
          address_id: 144444444444444,
          payment_method: 'cash',
        }
        const response = await request
          .post('/api/orders')
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send(data)
        expect(response.status).toBe(422)
      })

      it('validate user id  is required ', async (): Promise<void> => {
        const data = {
          address_id: 1,
          payment_method: 'cash',
        }
        const response = await request
          .post('/api/orders')
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send(data)
        expect(response.status).toBe(422)
      })

      it('validate addess id  is required ', async (): Promise<void> => {
        const data = {
          user_id: 1,
          payment_method: 'cash',
        }
        const response = await request
          .post('/api/orders')
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send(data)
        expect(response.status).toBe(422)
      })

      it('validate payment_method required', async (): Promise<void> => {
        const data = {
          user_id: 1,
          address_id: 1,
        }
        const response = await request
          .post('/api/orders')
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send(data)
        expect(response.status).toBe(422)
      })
    })
  })

  describe('Test Order Model Methods ', (): void => {
    it('check get method', async (): Promise<void> => {
      const result = await model.get()
      expect(typeof result).toBe('object')
    })

    it('check find method to be object', async (): Promise<void> => {
      const data: Order = {
        user_id: 1,
        products:
          'id:1,title:plapalapal,description:pl1p1l1p1,price:200,sale_price:100,stock:10',
        payment_method: 'cash',
        vat: 10,
        status: 'waiting',
        sub_total: 100,
        total: 110,
        address: 'plapallapala',
        order_number: 976767867,
      }
      const record = await model.store(data)
      const result = await model.find(record.id as unknown as string)
      await model.destroy(result.id as unknown as string)
      expect(typeof result).toBe('object')
    })

    it('check find method by id', async (): Promise<void> => {
      const data: Order = {
        user_id: 1,
        products:
          'id:1,title:plapalapal,description:pl1p1l1p1,price:200,sale_price:100,stock:10',
        payment_method: 'cash',
        vat: 10,
        status: 'waiting',
        sub_total: 100,
        total: 110,
        address: 'plapallapala',
        order_number: 976767867,
      }
      const record = await model.store(data)
      const result = await model.find(record.id as unknown as string)
      await model.destroy(result.id as unknown as string)
      expect(result.id).toBe(record.id)
    })

    it('check store method', async (): Promise<void> => {
      const data: Order = {
        user_id: 1,
        products:
          'id:1,title:plapalapal,description:pl1p1l1p1,price:200,sale_price:100,stock:10',
        payment_method: 'cash',
        vat: 10,
        status: 'waiting',
        sub_total: 100,
        total: 110,
        address: 'plapallapala',
        order_number: 976767867,
      }
      const result = await model.store(data)
      await model.destroy(result.id as unknown as string)
      expect(result.total).toBe(110)
    })

    it('check update method', async (): Promise<void> => {
      const data: Order = {
        user_id: 1,
        products:
          'id:1,title:plapalapal,description:pl1p1l1p1,price:200,sale_price:100,stock:10',
        payment_method: 'cash',
        vat: 10,
        status: 'waiting',
        sub_total: 100,
        total: 110,
        address: 'plapallapala',
        order_number: 976767867,
      }
      const store = await model.store(data)
      await model.update('cancel', Number(store.id))
      const result = await model.find(store.id as unknown as string)
      await model.destroy(result.id as unknown as string)
      expect(result.status).toBe('cancel')
    })

    it('check delete method', async (): Promise<void> => {
      const data: Order = {
        user_id: 1,
        products:
          'id:1,title:plapalapal,description:pl1p1l1p1,price:200,sale_price:100,stock:10',
        payment_method: 'cash',
        vat: 10,
        status: 'waiting',
        sub_total: 100,
        total: 110,
        address: 'plapallapala',
        order_number: 976767867,
      }
      const store = await model.store(data)
      const result = await model.destroy(store.id as unknown as string)
      expect(typeof result).toBe('undefined')
    })
  })
})
