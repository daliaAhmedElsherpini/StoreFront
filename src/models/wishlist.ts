import client from '../database' // import the database connection

export type Wishlist = {
  id?: number
  user_id: number
  product_id: number
}
export class WishlistModel {
  async get(): Promise<Wishlist[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM wishlist'
      const result = await client.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`ERROR: ${err}`)
    }
  }

  async find(id: string): Promise<Wishlist> {
    try {
      const sql = 'SELECT * FROM wishlist WHERE id=($1)'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Error: ${err}`)
    }
  }

  //where
  async where(string: string): Promise<Wishlist[]> {
    try {
      const conn = await client.connect()
      const sql = `SELECT * FROM wishlist WHERE ${string}`
      const result = await client.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Cannot Get The Record :  ${err}`)
    }
  }

  async store(request: Wishlist): Promise<Wishlist> {
    try {
      const sql =
        'INSERT INTO wishlist (user_id, product_id) VALUES($1, $2) RETURNING *'
      const conn = await client.connect()
      const result = await conn.query(sql, [
        request.user_id,
        request.product_id,
      ])
      const record = result.rows[0]
      conn.release()
      return record
    } catch (err) {
      throw new Error(`Error: ${err}`)
    }
  }

  async destroy(id: string): Promise<Wishlist> {
    try {
      const sql = 'DELETE FROM wishlist WHERE id =($1) RETURNING *'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      const wishlist = result.rows[0]
      conn.release()
      return wishlist
    } catch (err) {
      throw new Error(`Error: ${err}`)
    }
  }
}
