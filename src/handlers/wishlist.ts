import client from '../database' // import the database connection

export class WishlistHandler {
  async details(id: string): Promise<unknown> {
    try {
      // inner join query
      const sql =
        'SELECT * FROM wishlist INNER JOIN products ON wishlist.product_id = products.id WHERE user_id=($1)'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])

      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Could not find Wishlist ${id}. Error: ${err}`)
    }
  }
}
