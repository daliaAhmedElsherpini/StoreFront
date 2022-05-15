import client from '../database' // import the database connection

export type Category = {
  id?: number
  name: string
}
export type DATA = {
  products: Category
  name: string
  id: number
}
export class CategoryHandler {
  async details(id: string): Promise<DATA> {
    try {
      // inner join query
      const sql = `SELECT categories.name as category_name , products.* 
      FROM products
      INNER JOIN categories ON products.category_id = products.id WHERE category_id =$1`
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      const cat = await conn.query(
        'SELECT id , name FROM categories WHERE id =$1',
        [id]
      )
      conn.release()
      return {
        id: cat.rows[0].id,
        name: cat.rows[0].name,
        products: result.rows[0],
      }
    } catch (err) {
      throw new Error(`Could not find Category ${id}. Error: ${err}`)
    }
  }
}
