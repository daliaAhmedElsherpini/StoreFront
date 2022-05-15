import client from '../database' // import the database connection

export type Message = {
  id?: number
  name: string
  email: string
  subject: string
  message: string
}
export class ContactModel {
  async get(): Promise<Message[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM contact_messages'
      const result = await client.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Cannot Get Messages ${err}`)
    }
  }

  async find(id: string): Promise<Message> {
    try {
      const sql = 'SELECT * FROM contact_messages WHERE id=($1)'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find Message ${id}. Error: ${err}`)
    }
  }

  //where
  async where(string: string): Promise<Message[]> {
    try {
      const conn = await client.connect()
      const sql = `SELECT * FROM contact_messages WHERE ${string}`
      const result = await client.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Cannot Get Message :  ${err}`)
    }
  }

  async store(request: Message): Promise<Message> {
    try {
      const sql =
        'INSERT INTO contact_messages (name, email , subject , message , created_at) VALUES($1, $2, $3 , $4 , $5) RETURNING *'
      const conn = await client.connect()
      const result = await conn.query(sql, [
        request.name,
        request.email,
        request.subject,
        request.message,
        new Date(Date.now()),
      ])

      const Message = result.rows[0]

      conn.release()

      return Message
    } catch (err) {
      throw new Error(
        `Could not add new Message ${request.name}. Error: ${err}`
      )
    }
  }

  async update(request: Message): Promise<void> {
    const sql = `UPDATE contact_messages
     SET name =($1) ,
     email = ($2),
     subject = ($3), 
     message= ($4) 
     WHERE id = ($5)`
    const conn = await client.connect()
    await conn.query(sql, [
      request.name,
      request.email,
      request.subject,
      request.message,
      request.id,
    ])
    conn.release()
  }

  async destroy(id: string): Promise<Message> {
    try {
      const sql = 'DELETE FROM contact_messages WHERE id=($1) RETURNING *'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      const Message = result.rows[0]
      conn.release()

      return Message
    } catch (err) {
      throw new Error(`Could not delete Message ${id}. Error: ${err}`)
    }
  }
}
