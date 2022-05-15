import client from '../database' // import the database connection

export type product = {
  id?: number
  title: string
  description: string
  image: string
  stock: number
  price: number
  sale_price: number
  category_id: number
  created_at: Date
}
export class productModel {
  async get(): Promise<product[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM products'
      const result = await client.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Cannot Get products ${err}`)
    }
  }

  async find(id: string): Promise<product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)'
      //
      const conn = await client.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`)
    }
  }

  //where
  async where(string: string): Promise<product[]> {
    try {
      const conn = await client.connect()
      const sql = `SELECT * FROM products WHERE ${string}`
      const result = await client.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Cannot Get Product :  ${err}`)
    }
  }

  async store(request: product): Promise<product> {
    try {
      const sql = `INSERT INTO products 
        (title , stock ,  description , image, price , sale_price , category_id , created_at )
         VALUES($1, $2 , $3 , $4 , $5 , $6 , $7 , $8 ) RETURNING *`
      const conn = await client.connect()

      const result = await conn.query(sql, [
        request.title,
        request.stock,
        request.description,
        request.image,
        request.price,
        request.sale_price,
        request.category_id,
        new Date(Date.now()),
      ])

      const product = result.rows[0]

      conn.release()

      return product
    } catch (err) {
      throw new Error(`Could not add new product. Error: ${err}`)
    }
  }

  async update(request: product): Promise<void> {
    const sql = `UPDATE products SET 
      title ='${request.title}',
      description ='${request.description}' ,
      stock = ${request.stock},
      price = ${request.price},
      sale_price = ${request.sale_price},
      category_id = ${request.category_id}
      WHERE id =${request.id}`
    //
    const conn = await client.connect()
    await conn.query(sql)
    conn.release()
  }

  //delete product
  async destroy(id: string): Promise<product> {
    try {
      const sql = 'DELETE FROM products WHERE id=($1)'
      //
      const conn = await client.connect()

      const result = await conn.query(sql, [id])

      const product = result.rows[0]

      conn.release()

      return product
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`)
    }
  }
}
