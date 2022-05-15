import client from '../database' // import the database connection

export type AppInfo = {
  id?: number
  key: string
  value: string
}
export class AppInfoModel {
  async get(): Promise<AppInfo[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM app_info'
      const result = await client.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Cannot Get app_infos ${err}`)
    }
  }

  async find(id: string): Promise<AppInfo> {
    try {
      const sql = 'SELECT * FROM app_info WHERE id=($1)'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find app_info ${id}. Error: ${err}`)
    }
  }

  async store(request: AppInfo): Promise<AppInfo> {
    try {
      const sql =
        'INSERT INTO app_info (key , value ) VALUES($1, $2 ) RETURNING *'
      const conn = await client.connect()
      const result = await conn.query(sql, [request.key, request.value])
      const app_info = result.rows[0]
      conn.release()
      return app_info
    } catch (err) {
      throw new Error(`Could not add new app_info. Error: ${err}`)
    }
  }

  async update(request: AppInfo): Promise<void> {
    const sql = `UPDATE app_info SET 
      key ='${request.key}' ,
      value   ='${request.value}'
      WHERE id =${request.id}`
    const conn = await client.connect()
    await conn.query(sql)
    conn.release()
  }

  async destroy(id: string): Promise<AppInfo> {
    try {
      const sql = 'DELETE FROM app_info WHERE id=($1)'
      const conn = await client.connect()
      const result = await conn.query(sql, [id])
      const app_info = result.rows[0]
      conn.release()
      return app_info
    } catch (err) {
      throw new Error(`Could not delete app_info ${id}. Error: ${err}`)
    }
  }
}
