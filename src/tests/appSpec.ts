import supertest from 'supertest'
import app from '../index'

import { AppInfoModel, AppInfo } from '../models/appInfo'

const request = supertest(app)
const model = new AppInfoModel()
describe('Test Application Information ', (): void => {
  describe('Test Application Information endpoint responses ', (): void => {
    it('get all information about the application', async (): Promise<void> => {
      const response = await request.get('/api/appinfo')
      expect(response.status).toBe(200)
    })
  })

  describe('Test AppInfo Model Methods ', (): void => {
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
      const data: AppInfo = {
        key: 'privacy policy',
        value: 'plalalalalalal',
      }
      const result = await model.store(data)
      expect(result.value).toBe('plalalalalalal')
    })

    it('check update method', async (): Promise<void> => {
      const data: AppInfo = {
        key: 'privacy policy',
        value: 'plalalalalalal',
      }
      const store = await model.store(data)
      data.key = 'myAppInfo'
      data.id = store.id
      await model.update(data)
      const result = await model.find(store.id as unknown as string)
      expect(result.key).toBe('myAppInfo')
    })

    it('check delete method', async (): Promise<void> => {
      const data: AppInfo = {
        key: 'privacy policy',
        value: 'plalalalalalal',
      }
      const store = await model.store(data)
      const result = await model.destroy(store.id as unknown as string)
      expect(typeof result).toBe('undefined')
    })
  })
})
