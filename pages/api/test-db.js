 import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

export default async function handler(req, res) {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT NOW()')
    client.release()
    
    return res.status(200).json({
      success: true,
      message: '數據庫連接成功！',
      timestamp: result.rows[0].now
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: '數據庫連接失敗',
      error: error.message
    })
  }
}