import client from '../database' // import the database connection

export type Review = {
  id?: number
  user_id: number
  product_id: number
  review: string
  rate: number
}
export class ReviewModel {
  async get(): Promise<Review[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM reviews'
      const result = await client.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`ERROR: ${err}`)
    }
  }

  async find(id: string): Promise<Review> {
    try {
      const sql = 'SELECT * FROM reviews WHERE id=($1)'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Error: ${err}`)
    }
  }

  //where
  async where(string: string): Promise<Review[]> {
    try {
      const conn = await client.connect()
      const sql = `SELECT * FROM reviews WHERE ${string}`
      const result = await client.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Cannot Get Review :  ${err}`)
    }
  }

  async store(request: Review): Promise<Review> {
    try {
      const sql =
        'INSERT INTO reviews (user_id, product_id , rate , review , created_at) VALUES($1, $2, $3 , $4 , $5) RETURNING *'
      const conn = await client.connect()
      const result = await conn.query(sql, [
        request.user_id,
        request.product_id,
        request.rate,
        request.review,
        new Date(Date.now()),
      ])
      const review = result.rows[0]
      conn.release()
      return review
    } catch (err) {
      throw new Error(`Error: ${err}`)
    }
  }

  async update(request: Review): Promise<void> {
    const sql = `UPDATE reviews SET 
      rate = ($1) ,
      review =($2)
      WHERE id =($3)`
    const conn = await client.connect()
    await conn.query(sql, [request.rate, request.review, request.id])
    conn.release()
  }

  async destroy(id: string): Promise<Review> {
    try {
      const sql = 'DELETE FROM reviews WHERE id=($1) RETURNING *'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      const review = result.rows[0]
      conn.release()
      return review
    } catch (err) {
      throw new Error(`Error: ${err}`)
    }
  }
}
