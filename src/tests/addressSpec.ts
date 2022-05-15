import supertest from 'supertest'
import app from '../index'
import { UserAddress, userAddressModel } from '../models/userAddress'
const request = supertest(app)
const model = new userAddressModel()

describe('Test User Addresses endpoint responses ', (): void => {
  let token: string
  let address_id: number

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

  // get all addresses of a user with id 1
  it('get all addresses of a user with id 1', async (): Promise<void> => {
    const response = await request
      .get('/api/user-addresses/1')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })

  // add address
  it('add address', async (): Promise<void> => {
    const data = {
      user_id: 1,
      city_id: 1,
      country_id: 1,
      street: 'mohammed bin zayed street',
      flat_number: '1',
      address: 'elshamkha abu dhabi united arab emarites',
      email: 'dalia@gmail.com',
      phone_number: '376745654563',
    }
    const response = await request
      .post('/api/user-addresses')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
    address_id = response.body.data.id
    expect(response.status).toBe(200)
  })

  // update address
  it('update address', async (): Promise<void> => {
    const data = {
      user_id: 1,
      city_id: 1,
      country_id: 2,
      street: 'mohammed bin zayed street',
      flat_number: '1',
      address: 'elshamkha abu dhabi united arab emarites',
      email: 'dalia@gmail.com',
      phone_number: '376745654563',
    }
    const response = await request
      .put('/api/user-addresses/' + address_id)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
    expect(response.status).toBe(200)
  })

  // remove an address
  it('remove an address', async (): Promise<void> => {
    const response = await request
      .delete('/api/user-addresses/' + address_id)
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })

  describe('Addresses Validation', (): void => {
    // validate user id
    it('validate user id  is right ', async (): Promise<void> => {
      const data = {
        user_id: 11111,
        city_id: 1,
        country_id: 2,
        street: 'mohammed bin zayed street',
        flat_number: '1',
        address: 'elshamkha abu dhabi united arab emarites',
        email: 'dalia@gmail.com',
        phone_number: '376745654563',
      }
      const response = await request
        .post('/api/user-addresses')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(data)
      expect(response.status).toBe(422)
    })

    // validate user id  is required
    it('validate user id  is required ', async (): Promise<void> => {
      const data = {
        city_id: 1,
        country_id: 2,
        street: 'mohammed bin zayed street',
        flat_number: '1',
        address: 'elshamkha abu dhabi united arab emarites',
        email: 'dalia@gmail.com',
        phone_number: '376745654563',
      }
      const response = await request
        .post('/api/user-addresses')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(data)
      expect(response.status).toBe(422)
    })

    // validate city  id
    it('validate city id  is right ', async (): Promise<void> => {
      const data = {
        user_id: 1,
        city_id: 1444444444,
        country_id: 2,
        street: 'mohammed bin zayed street',
        flat_number: '1',
        address: 'elshamkha abu dhabi united arab emarites',
        email: 'dalia@gmail.com',
        phone_number: '376745654563',
      }
      const response = await request
        .post('/api/user-addresses')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(data)
      expect(response.status).toBe(422)
    })

    // validate city id is required
    it('validate user id  is required ', async (): Promise<void> => {
      const data = {
        user_id: 1,
        country_id: 2,
        street: 'mohammed bin zayed street',
        flat_number: '1',
        address: 'elshamkha abu dhabi united arab emarites',
        email: 'dalia@gmail.com',
        phone_number: '376745654563',
      }
      const response = await request
        .post('/api/user-addresses')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(data)
      expect(response.status).toBe(422)
    })

    // validate country id
    it('validatecountry id  is right ', async (): Promise<void> => {
      const data = {
        user_id: 1,
        city_id: 1,
        country_id: 26666666666,
        street: 'mohammed bin zayed street',
        flat_number: '1',
        address: 'elshamkha abu dhabi united arab emarites',
        email: 'dalia@gmail.com',
        phone_number: '376745654563',
      }
      const response = await request
        .post('/api/user-addresses')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(data)
      expect(response.status).toBe(422)
    })

    // validate country id is required
    it('validate country id is required', async (): Promise<void> => {
      const data = {
        user_id: 1,
        city_id: 1,
        street: 'mohammed bin zayed street',
        flat_number: '1',
        address: 'elshamkha abu dhabi united arab emarites',
        email: 'dalia@gmail.com',
        phone_number: '376745654563',
      }
      const response = await request
        .post('/api/user-addresses')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(data)
      expect(response.status).toBe(422)
    })

    // validate street
    it('validate street', async (): Promise<void> => {
      const data = {
        user_id: 1,
        city_id: 1,
        country_id: 2,
        flat_number: '1',
        address: 'elshamkha abu dhabi united arab emarites',
        email: 'dalia@gmail.com',
        phone_number: '376745654563',
      }
      const response = await request
        .post('/api/user-addresses')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(data)
      expect(response.status).toBe(422)
    })

    // validate flat number
    it('validate flat number', async (): Promise<void> => {
      const data = {
        user_id: 1,
        city_id: 1,
        country_id: 2,
        street: 'mohammed bin zayed street',
        address: 'elshamkha abu dhabi united arab emarites',
        email: 'dalia@gmail.com',
        phone_number: '376745654563',
      }
      const response = await request
        .post('/api/user-addresses')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(data)
      expect(response.status).toBe(422)
    })

    // validate address
    it('validate address', async (): Promise<void> => {
      const data = {
        user_id: 1,
        city_id: 1,
        country_id: 2,
        street: 'mohammed bin zayed street',
        flat_number: '1',
        email: 'dalia@gmail.com',
        phone_number: '376745654563',
      }
      const response = await request
        .post('/api/user-addresses')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(data)
      expect(response.status).toBe(422)
    })

    // validate email
    it('validate email', async (): Promise<void> => {
      const data = {
        user_id: 1,
        city_id: 1,
        country_id: 2,
        street: 'mohammed bin zayed street',
        flat_number: '1',
        address: 'elshamkha abu dhabi united arab emarites',
        phone_number: '376745654563',
      }
      const response = await request
        .post('/api/user-addresses')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(data)
      expect(response.status).toBe(422)
    })

    // validate phone number
    it('validate phone number', async (): Promise<void> => {
      const data = {
        user_id: 1,
        city_id: 1,
        country_id: 2,
        street: 'mohammed bin zayed street',
        flat_number: '1',
        address: 'elshamkha abu dhabi united arab emarites',
        email: 'dalia@gmail.com',
      }
      const response = await request
        .post('/api/user-addresses')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(data)
      expect(response.status).toBe(422)
    })
  })

  describe('Test UserAddress Model Methods ', (): void => {
    it('check get method', async (): Promise<void> => {
      const result = await model.get()
      expect(typeof result).toBe('object')
    })

    it('check find method to be object', async (): Promise<void> => {
      const data: UserAddress = {
        country: 'country',
        city: 'city',
        flat_number: '22',
        address: 'address',
        street: 'street',
        user_id: 1,
        email: 'emaail',
        phone_number: '989758758',
      }
      const record = await model.store(data)
      const result = await model.find(record.id as unknown as string)
      await model.destroy(record.id as unknown as string)
      expect(typeof result).toBe('object')
    })

    it('check find method id to be 1', async (): Promise<void> => {
      const data: UserAddress = {
        country: 'country',
        city: 'city',
        flat_number: '22',
        address: 'address',
        street: 'street',
        user_id: 1,
        email: 'emaail',
        phone_number: '989758758',
      }
      const record = await model.store(data)
      const result = await model.find(record.id as unknown as string)
      await model.destroy(record.id as unknown as string)
      expect(result.id).toBe(record.id)
    })

    it('check store method', async (): Promise<void> => {
      const data: UserAddress = {
        country: 'country',
        city: 'city',
        flat_number: '22',
        address: 'address',
        street: 'street',
        user_id: 1,
        email: 'emaail',
        phone_number: '989758758',
      }
      const result = await model.store(data)
      expect(result.phone_number).toBe('989758758')
    })

    it('check update method', async (): Promise<void> => {
      const data: UserAddress = {
        country: 'country',
        city: 'city',
        flat_number: '22',
        address: 'address',
        street: 'street',
        user_id: 1,
        email: 'emaail',
        phone_number: '989758758',
      }
      const store = await model.store(data)
      data.street = 'my street'
      data.id = store.id
      await model.update(data)
      const result = await model.find(store.id as unknown as string)
      expect(result.street).toBe('my street')
    })

    it('check delete method', async (): Promise<void> => {
      const data: UserAddress = {
        country: 'country',
        city: 'city',
        flat_number: '22',
        address: 'address',
        street: 'street',
        user_id: 1,
        email: 'emaail',
        phone_number: '989758758',
      }
      const store = await model.store(data)
      const result = await model.destroy(store.id as unknown as string)
      expect(typeof result).toBe('object')
    })
  })
})
