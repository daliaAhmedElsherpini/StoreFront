import client from '../database' // import the database connection

export type City = {
  id?: number
  country_id: number
  name: string
}
export class CityModel {
  async get(): Promise<City[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM cities'
      const result = await client.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Can not Get cities ${err}`)
    }
  }

  async find(id: string): Promise<City> {
    try {
      const sql = 'SELECT * FROM cities WHERE id=($1)'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find City ${id}. Error: ${err}`)
    }
  }

  //where
  async where(string: string): Promise<City[]> {
    try {
      const conn = await client.connect()
      const sql = `SELECT * FROM cities WHERE ${string}`
      const result = await client.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Cannot Get City :  ${err}`)
    }
  }
  async store(request: City): Promise<City> {
    try {
      const sql =
        'INSERT INTO cities ( name  , country_id) VALUES($1) RETURNING *'
      const conn = await client.connect()
      const result = await conn.query(sql, [request.name, request.country_id])
      const City = result.rows[0]
      conn.release()
      return City
    } catch (err) {
      throw new Error(`Could not add new City. Error: ${err}`)
    }
  }

  async update(request: City): Promise<void> {
    const sql = `UPDATE cities SET 
        name =($1) ,
        country_id = ($2) ,
        WHERE id = ($3)`
    const conn = await client.connect()
    await conn.query(sql, [request.name, request.country_id, request.id])
    conn.release()
  }

  async destroy(id: string): Promise<City> {
    try {
      const sql = 'DELETE FROM cities WHERE id=($1)'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      const City = result.rows[0]
      conn.release()
      return City
    } catch (err) {
      throw new Error(`Could not delete City ${id}. Error: ${err}`)
    }
  }
}
