import client from '../database' // import the database connection

export type Cart = {
  id?: number
  product_id: number
  user_id: number
  quantity: number
  total: number
}
export class CartModel {
  async get(): Promise<Cart[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM cart'
      const result = await client.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Cannot Get cart ${err}`)
    }
  }

  async find(id: string): Promise<Cart> {
    try {
      const sql = 'SELECT * FROM cart WHERE id=($1)'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find cart ${id}. Error: ${err}`)
    }
  }

  //where
  async where(string: string): Promise<Cart[]> {
    try {
      const conn = await client.connect()
      const sql = `SELECT * FROM cart WHERE ${string}`
      const result = await client.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Cannot Get The Record :  ${err}`)
    }
  }

  async store(request: Cart): Promise<Cart> {
    try {
      const sql =
        'INSERT INTO cart (user_id , product_id , quantity , total ) VALUES($1, $2 , $3 , $4 ) RETURNING *'
      const conn = await client.connect()
      const result = await conn.query(sql, [
        request.user_id,
        request.product_id,
        request.quantity,
        request.total,
      ])
      const cart = result.rows[0]
      conn.release()

      return cart
    } catch (err) {
      throw new Error(`Could not add new cart. Error: ${err}`)
    }
  }

  async update(request: Cart): Promise<void> {
    const sql = `UPDATE cart SET 
        quantity ='${request.quantity}' ,
        total   ='${request.total}'
        WHERE id =${request.id}`
    const conn = await client.connect()
    await conn.query(sql)
    conn.release()
  }

  async destroy(id: string): Promise<Cart> {
    try {
      const sql = 'DELETE FROM cart WHERE id=($1)'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      const cart = result.rows[0]
      conn.release()

      return cart
    } catch (err) {
      throw new Error(`Could not delete cart ${id}. Error: ${err}`)
    }
  }
}
