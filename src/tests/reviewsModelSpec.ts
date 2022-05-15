import { ReviewModel, Review } from './../models/review'
const model = new ReviewModel()

describe('Test ReviewModel Methods ', (): void => {
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
    const data: Review = {
      user_id: 1,
      product_id: 1,
      rate: 3,
      review: 'good',
    }
    const result = await model.store(data)
    expect(result.rate).toBe(3)
  })

  it('check update method', async (): Promise<void> => {
    const data: Review = {
      user_id: 1,
      product_id: 1,
      rate: 3,
      review: 'good',
    }
    const store = await model.store(data)
    data.rate = 2
    data.id = store.id
    await model.update(data)
    const result = await model.find(store.id as unknown as string)
    expect(result.rate).toBe(2)
  })

  it('check delete method', async (): Promise<void> => {
    const data: Review = {
      user_id: 1,
      product_id: 1,
      rate: 3,
      review: 'good',
    }
    const store = await model.store(data)
    const result = await model.destroy(store.id as unknown as string)
    expect(typeof result).toBe('object')
  })
})
