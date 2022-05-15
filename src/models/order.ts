import client from '../database' // import the database connection

export type Order = {
  id?: number
  order_number: number
  products: string
  address: string
  sub_total: number
  vat: number
  total: number
  payment_method: string
  user_id: number
  status: string
}
export class OrderModel {
  // get all orders
  async get(): Promise<Order[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM orders'
      const result = await client.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Cannot Get order ${err}`)
    }
  }

  //where
  async where(string: string): Promise<Order[]> {
    try {
      const conn = await client.connect()
      const sql = `SELECT * FROM orders WHERE ${string}`
      const result = await client.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Cannot Get order ${err}`)
    }
  }
  // get order  by order  id
  async find(id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`)
    }
  }

  // insert into order
  async store(request: Order): Promise<Order> {
    try {
      const sql = `INSERT INTO orders (order_number, products , address , sub_total , vat , total , payment_method , user_id , status , created_at )
                 VALUES($1, $2 , $3 , $4 ,$5 , $6 , $7 , $8 , $9 , $10 ) RETURNING *`
      const conn = await client.connect()
      const result = await conn.query(sql, [
        request.order_number,
        request.products,
        request.address,
        request.sub_total,
        request.vat,
        request.total,
        request.payment_method,
        request.user_id,
        request.status,
        new Date(Date.now()),
      ])
      const order = result.rows[0]
      conn.release()

      return order
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`)
    }
  }

  // update order
  async update(status: string, id: number): Promise<void> {
    const sql = `UPDATE orders SET 
        status = ($1) 
        WHERE id = ($2)  RETURNING *`
    const conn = await client.connect()
    const result = await conn.query(sql, [status, id])
    conn.release()
    return result.rows[0]
  }

  // delete order record by record id
  async destroy(id: string): Promise<Order> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1)'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      const order = result.rows[0]
      conn.release()

      return order
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`)
    }
  }
}
