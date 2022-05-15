import client from '../database' // import the database connection

export type UserAddress = {
  id?: number
  user_id: number
  city: string
  country: string
  street: string
  flat_number: string
  address: string
  email: string
  phone_number: string
}
export class userAddressModel {
  // get all addresses
  async get(): Promise<UserAddress[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM user_addresses'
      const result = await client.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Cannot Get user_addresses ${err}`)
    }
  }
  // where condition
  async where(string: string): Promise<UserAddress[]> {
    try {
      const conn = await client.connect()
      const sql = `SELECT * FROM user_addresses WHERE ${string}`
      const result = await client.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Cannot Get user_addresses ${err}`)
    }
  }

  //find an address
  async find(id: string): Promise<UserAddress> {
    try {
      const sql = 'SELECT * FROM user_addresses WHERE id=($1)'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find user_addresse ${id}. Error: ${err}`)
    }
  }

  //store address
  async store(request: UserAddress): Promise<UserAddress> {
    try {
      const sql = `INSERT INTO user_addresses (user_id , country , city , street , flat_number , address , email , phone_number )
                VALUES($1, $2 , $3 , $4 , $5 , $6 , $7 , $8 ) RETURNING *`
      const conn = await client.connect()
      const result = await conn.query(sql, [
        request.user_id,
        request.country,
        request.city,
        request.street,
        request.flat_number,
        request.address,
        request.email,
        request.phone_number,
      ])
      const user_address = result.rows[0]
      conn.release()

      return user_address
    } catch (err) {
      throw new Error(`Could not add new address . Error: ${err}`)
    }
  }

  // update address
  async update(request: UserAddress): Promise<void> {
    const sql = `UPDATE user_addresses SET 
        user_id = ($1) ,
        city   = ($2),
        country = ($3) ,
        street   = ($4),
        flat_number = ($5) ,
        address  = ($6),
        phone_number = ($7),
        email   = ($8)
        WHERE id =($9) RETURNING *`
    const conn = await client.connect()
    const result = await conn.query(sql, [
      request.user_id,
      request.city,
      request.country,
      request.street,
      request.flat_number,
      request.address,
      request.phone_number,
      request.email,
      request.id,
    ])
    conn.release()
    return result.rows[0]
  }

  //destroy address
  async destroy(id: string): Promise<UserAddress> {
    try {
      const sql = 'DELETE FROM user_addresses WHERE id=($1) RETURNING *'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      const user_address = result.rows[0]
      conn.release()

      return user_address
    } catch (err) {
      throw new Error(`Could not delete Address ${id}.Error: ${err}`)
    }
  }
}
