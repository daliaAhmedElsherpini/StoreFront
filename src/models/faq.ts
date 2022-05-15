import client from '../database' // import the database connection

export type Faq = {
  id?: number
  question: string
  answer: string
}
export class FaqModel {
  async get(): Promise<Faq[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM faqs'
      const result = await client.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Cannot Get Faqs ${err}`)
    }
  }

  async find(id: string): Promise<Faq> {
    try {
      const sql = 'SELECT * FROM faqs WHERE id=($1)'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find Faq ${id}. Error: ${err}`)
    }
  }

  //where
  async where(string: string): Promise<Faq[]> {
    try {
      const conn = await client.connect()
      const sql = `SELECT * FROM faqs WHERE ${string}`
      const result = await client.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Cannot Get Faq :  ${err}`)
    }
  }
  async store(request: Faq): Promise<Faq> {
    try {
      const sql =
        'INSERT INTO faqs (question , answer ) VALUES($1, $2 ) RETURNING *'
      const conn = await client.connect()
      const result = await conn.query(sql, [request.question, request.answer])
      const Faq = result.rows[0]
      conn.release()

      return Faq
    } catch (err) {
      throw new Error(`Could not add new Faq. Error: ${err}`)
    }
  }

  async update(request: Faq): Promise<void> {
    const sql = `UPDATE faqs SET 
      question = ($1),
      answer   = ($2)
      WHERE id = ($3)`
    const conn = await client.connect()
    await conn.query(sql, [request.question, request.answer, request.id])
    conn.release()
  }

  async destroy(id: string): Promise<Faq> {
    try {
      const sql = 'DELETE FROM faqs WHERE id=($1)'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      const Faq = result.rows[0]
      conn.release()

      return Faq
    } catch (err) {
      throw new Error(`Could not delete Faq ${id}. Error: ${err}`)
    }
  }
}
