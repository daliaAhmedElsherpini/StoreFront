import client from '../database' // import the database connection

export type Country = {
  id?: number
  name: string
}
export class CountryModel {
  async get(): Promise<Country[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM countries'
      const result = await client.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Can not Get countries ${err}`)
    }
  }

  async find(id: string): Promise<Country> {
    try {
      const sql = 'SELECT * FROM countries WHERE id=($1)'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find Country ${id}. Error: ${err}`)
    }
  }

  //where
  async where(string: string): Promise<Country[]> {
    try {
      const conn = await client.connect()
      const sql = `SELECT * FROM countries WHERE ${string}`
      const result = await client.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Cannot Get Country :  ${err}`)
    }
  }

  async store(request: Country): Promise<Country> {
    try {
      const sql = 'INSERT INTO countries ( name ) VALUES($1) RETURNING *'
      const conn = await client.connect()
      const result = await conn.query(sql, [request.name])
      const Country = result.rows[0]
      conn.release()
      return Country
    } catch (err) {
      throw new Error(`Could not add new Country. Error: ${err}`)
    }
  }

  async update(request: Country): Promise<void> {
    const sql = `UPDATE countries SET 
        name = ($1)
        WHERE id = ($2)`
    const conn = await client.connect()
    await conn.query(sql, [request.name, request.id])
    conn.release()
  }

  async destroy(id: string): Promise<Country> {
    try {
      const sql = 'DELETE FROM countries WHERE id=($1) RETURNING *'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      const Country = result.rows[0]
      conn.release()
      return Country
    } catch (err) {
      throw new Error(`Could not delete Country ${id}. Error: ${err}`)
    }
  }
}
