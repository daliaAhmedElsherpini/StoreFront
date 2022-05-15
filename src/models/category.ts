import client from '../database' // import the database connection

export type Category = {
  id?: number
  name: string
  description: string
  image: string
}
export class CategoryModel {
  async get(): Promise<Category[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM categories'
      const result = await client.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Can not Get categories ${err}`)
    }
  }

  async find(id: string): Promise<Category> {
    try {
      const sql = 'SELECT * FROM categories WHERE id=($1)'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find Category ${id}. Error: ${err}`)
    }
  }

  //where
  async where(string: string): Promise<Category[]> {
    try {
      const conn = await client.connect()
      const sql = `SELECT * FROM categories WHERE ${string}`
      const result = await client.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Cannot Get Category :  ${err}`)
    }
  }

  async store(request: Category): Promise<Category> {
    try {
      const sql =
        'INSERT INTO categories ( name , description , image ) VALUES($1 , $2 , $3) RETURNING *'
      const conn = await client.connect()
      const result = await conn.query(sql, [
        request.name,
        request.description,
        request.image,
      ])
      const Category = result.rows[0]
      conn.release()
      return Category
    } catch (err) {
      throw new Error(`Could not add new Category. Error: ${err}`)
    }
  }

  async update(request: Category): Promise<void> {
    const sql = `UPDATE categories SET 
        name =($1) ,
        description =($2) ,
        image =($3)
        WHERE id =($4)`
    const conn = await client.connect()
    await conn.query(sql, [
      request.name,
      request.description,
      request.image,
      request.id,
    ])
    conn.release()
  }

  async destroy(id: string): Promise<Category> {
    try {
      const sql = 'DELETE FROM categories WHERE id=($1)'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      const Category = result.rows[0]
      conn.release()
      return Category
    } catch (err) {
      throw new Error(`Could not delete Category ${id}. Error: ${err}`)
    }
  }
}
