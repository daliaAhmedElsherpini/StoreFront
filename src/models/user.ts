import client from '../database' // import the database connection

export type User = {
  id?: number
  name: string
  email: string
  phone: string
  status: boolean
  city_id: number
  country_id: number
  password: string
}
export class UserModel {
  async get(): Promise<User[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM users'
      const result = await client.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Cannot Get Users ${err}`)
    }
  }

  async find(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find User ${id}. Error: ${err}`)
    }
  }

  //where
  async where(string: string): Promise<User[]> {
    try {
      const conn = await client.connect()
      const sql = `SELECT * FROM users WHERE ${string}`
      const result = await client.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Cannot Get User :  ${err}`)
    }
  }

  async store(request: User): Promise<User> {
    try {
      const sql =
        'INSERT INTO users (name, email ,phone  , country_id , city_id ,  password , created_at) VALUES($1, $2, $3 , $4 , $5 , $6 , $7 ) RETURNING *'
      const conn = await client.connect()
      const result = await conn.query(sql, [
        request.name,
        request.email,
        request.phone,
        request.country_id,
        request.city_id,
        request.password,
        new Date(Date.now()),
      ])
      const user = result.rows[0]

      conn.release()

      return user
    } catch (err) {
      throw new Error(`Could not add new user ${request.name}. Error: ${err}`)
    }
  }

  async update(request: User): Promise<void> {
    try {
      const sql = `UPDATE users SET 
      name = ($1),
      email =($2) ,
      phone = ($3),
      status = ($4),
      city_id = ($5),
      country_id = ($6),
      password = ($7)
      WHERE id = ($8) RETURNING *`
      //
      const conn = await client.connect()
      const result = await conn.query(sql, [
        request.name,
        request.email,
        request.phone,
        request.status,
        request.city_id,
        request.country_id,
        request.password,
        request.id,
      ])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`${err}`)
    }
  }

  // delete user
  async destroy(id: string): Promise<User> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1)'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      const user = result.rows[0]
      conn.release()
      return user
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`)
    }
  }
}
