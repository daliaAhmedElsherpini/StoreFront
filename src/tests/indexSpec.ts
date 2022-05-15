import supertest from 'supertest'
import app from '../index'

const request = supertest(app)
describe('Test Api endpoint responses ', (): void => {
  it('check if api is working', async (): Promise<void> => {
    const response = await request.get('/api')
    expect(response.status).toBe(200)
  })
})
