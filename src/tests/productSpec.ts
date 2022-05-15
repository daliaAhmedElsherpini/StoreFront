import supertest from 'supertest'
import app from '../index'
import { productModel, product } from '../models/product'

const request = supertest(app)
const model = new productModel()

describe('Test Products endpoint responses ', (): void => {
  //login beforeAll all to get token
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

  //get all products
  it('get all products', async (): Promise<void> => {
    const response = await request.get('/api/products')
    expect(response.status).toBe(200)
  })

  // check with valid id
  it('check get details of a product with its id', async (): Promise<void> => {
    const response = await request.get('/api/faqs/1')
    expect(response.status).toBe(200)
  })

  // check with invalid id
  it('check get details of a product with wrong id', async (): Promise<void> => {
    const response = await request.get('/api/products/1000')
    expect(response.status).toBe(404)
  })

  // get product reviews
  it('get product reviews', async (): Promise<void> => {
    const response = await request.get('/api/reviews/1')
    expect(response.status).toBe(200)
  })

  // add Review to a product
  it('add review to a product', async (): Promise<void> => {
    const data = {
      user_id: 1,
      product_id: 1,
      rate: 4,
      review:
        'its a very nice product its a very nice product its a very nice product',
    }
    const response = await request
      .post('/api/reviews')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
    expect(response.status).toBe(200)
  })

  // add Review to a product with wrong rate
  it('add review to a product with wrong rate its supposed to be from 1 to 5', async (): Promise<void> => {
    const data = {
      user_id: 1,
      product_id: 1,
      rate: 8,
      review:
        'its a very nice product its a very nice product its a very nice product',
    }
    const response = await request
      .post('/api/reviews')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
    expect(response.status).toBe(422)
  })

  // add Review to a product with check user validation
  it('add review to a product with wrong user id ', async (): Promise<void> => {
    const data = {
      user_id: 122222,
      product_id: 1,
      rate: 4,
      review:
        'its a very nice product its a very nice product its a very nice product',
    }
    const response = await request
      .post('/api/reviews')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
    expect(response.status).toBe(422)
  })

  // add Review to a product with check product_id validation
  it('add review to a product with wrong product id ', async (): Promise<void> => {
    const data = {
      user_id: 1,
      product_id: 188888,
      rate: 4,
      review:
        'its a very nice product its a very nice product its a very nice product',
    }
    const response = await request
      .post('/api/reviews')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
    expect(response.status).toBe(422)
  })

  // add Review to a product with check required fields (user id) validation
  it('add review to a product without user id ', async (): Promise<void> => {
    const data = {
      product_id: 1,
      rate: 4,
      review:
        'its a very nice product its a very nice product its a very nice product',
    }
    const response = await request
      .post('/api/reviews')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
    expect(response.status).toBe(422)
  })

  // add Review to a product with check required fields (product id) validation
  it('add review to a product without product id ', async (): Promise<void> => {
    const data = {
      user_id: 1,
      rate: 4,
      review:
        'its a very nice product its a very nice product its a very nice product',
    }
    const response = await request
      .post('/api/reviews')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
    expect(response.status).toBe(422)
  })

  // add Review to a product with check required fields (rate) validation
  it('add review to a product without rate ', async (): Promise<void> => {
    const data = {
      product_id: 1,
      user_id: 1,
      review:
        'its a very nice product its a very nice product its a very nice product',
    }
    const response = await request
      .post('/api/reviews')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
    expect(response.status).toBe(422)
  })

  // add Review to a product with check required fields (review) validation
  it('add review to a product without review ', async (): Promise<void> => {
    const data = {
      product_id: 1,
      rate: 4,
    }
    const response = await request
      .post('/api/reviews')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
    expect(response.status).toBe(422)
  })

  // add Review to a product with check review validation
  it('add review to a product with wrong review text ', async (): Promise<void> => {
    const data = {
      product_id: 1,
      rate: 4,
      review: 'nice',
    }
    const response = await request
      .post('/api/reviews')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
    expect(response.status).toBe(422)
  })

  describe('Test  Products  Model Methods ', (): void => {
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
      const data: product = {
        title: 'title',
        image: 'image.png',
        stock: 30,
        description: 'good',
        price: 200,
        sale_price: 180,
        category_id: 1,
        created_at: new Date(Date.now()),
      }
      const result = await model.store(data)
      expect(result.price).toBe(200)
    })

    it('check update method', async (): Promise<void> => {
      const data: product = {
        title: 'title',
        image: 'image.png',
        stock: 30,
        description: 'good',
        price: 200,
        sale_price: 180,
        category_id: 1,
        created_at: new Date(Date.now()),
      }
      const store = await model.store(data)
      data.price = 500
      data.id = store.id
      await model.update(data)
      const result = await model.find(store.id as unknown as string)
      expect(result.price).toBe(500)
    })

    it('check delete method', async (): Promise<void> => {
      const data: product = {
        title: 'title',
        image: 'image.png',
        stock: 30,
        description: 'good',
        price: 200,
        sale_price: 180,
        category_id: 1,
        created_at: new Date(Date.now()),
      }
      const store = await model.store(data)
      const result = await model.destroy(store.id as unknown as string)
      expect(typeof result).toBe('undefined')
    })
  })
})
