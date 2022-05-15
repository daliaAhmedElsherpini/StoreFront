import supertest from 'supertest'
import app from '../index'
import { UserModel, User } from '../models/user'

const request = supertest(app)
const model = new UserModel()
describe('Test Users  responses ', (): void => {
  describe('Test Users endpoint responses ', (): void => {
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

    // check with valid id
    it('check get details of the User with its id', async (): Promise<void> => {
      const response = await request
        .get('/api/user/1')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200)
    })

    // check with invalid id
    it('check get details of the User with wrong id', async (): Promise<void> => {
      const response = await request
        .get('/api/user/1000')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(404)
    })

    // register
    it('register new account', async (): Promise<void> => {
      const response = await request.post('/api/auth/register').send({
        name: 'dalia ali',
        email: 'ljkjvvk@jhjhjhjh.com',
        phone: '0909998559878776665658786876757656',
        password: 'dalia123',
        city_id: 1,
        country_id: 1,
      })

      expect(response.status).toBe(200)
    })

    // login
    it('Login', async (): Promise<void> => {
      const data = {
        email: 'daliaahmed@gmail.com',
        password: 'dalia123',
      }
      const response = await request
        .post('/api/auth/login')
        .set('Content-type', 'application/json')
        .send(data)
      expect(response.status).toBe(200)
    })

    afterAll(async () => {
      const user = await model.where(
        "email = 'ljkjvvk@jhjhjhjh.com' AND phone = '0909998559878776665658786876757656'"
      )
      await model.destroy(user[0].id as unknown as string)
    })
  })

  describe('Test Users Model Methods ', (): void => {
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
      const email = Math.random().toString(16)
      const phone = Math.random().toString(16)

      const data: User = {
        name: 'name',
        email: email,
        phone: phone,
        country_id: 1,
        city_id: 1,
        password: '12344',
        status: true,
      }

      const result = await model.store(data)
      expect(result.name).toBe('name')
    })

    it('check update method', async (): Promise<void> => {
      const email = Math.random().toString(16)
      const phone = Math.random().toString(16)

      const data: User = {
        name: 'name',
        email: email,
        phone: phone,
        country_id: 1,
        city_id: 1,
        password: '12344',
        status: true,
      }
      const store = await model.store(data)
      data.name = 'my User'
      data.id = store.id
      await model.update(data)
      const result = await model.find(store.id as unknown as string)
      expect(result.name).toBe('my User')
    })

    it('check delete method', async (): Promise<void> => {
      const data: User = {
        name: 'name',
        email: 'emaily',
        phone: '4444445555',
        country_id: 1,
        city_id: 1,
        password: '12344',
        status: true,
      }
      const store = await model.store(data)
      const result = await model.destroy(store.id as unknown as string)
      expect(typeof result).toBe('undefined')
    })
  })
})
