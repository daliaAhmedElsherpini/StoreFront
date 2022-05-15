import client from '../database' // import the database connection

export type Cart = {
  id?: number
  product_id: number
  user_id: number
  quantity: number
  total: number
}
export class CartHandler {
  // get all products of a user cart
  // id here represents user_id
  async products(id: string): Promise<Cart[]> {
    try {
      const conn = await client.connect()
      const sql =
        'SELECT cart.id as cart_id , cart.* , products.* FROM cart INNER JOIN products ON cart.product_id = products.id WHERE user_id =($1)'
      const result = await client.query(sql, [id])
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Cannot Get cart ${err}`)
    }
  }

  async total(id: string): Promise<Cart[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT sum(total) as total FROM cart WHERE user_id =($1)'
      const result = await client.query(sql, [id])
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Cannot Get cart ${err}`)
    }
  }

  async deleteWhere(string: string): Promise<Cart[]> {
    try {
      const conn = await client.connect()
      const sql = `DELETE FROM cart WHERE ${string}`
      const result = await client.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Cannot Get cart ${err}`)
    }
  }
}
