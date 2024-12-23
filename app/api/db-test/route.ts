import { NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

export async function GET() {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT NOW()')
    client.release()
    
    return NextResponse.json({
      success: true,
      message: '數據庫連接成功！',
      timestamp: result.rows[0].now
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: '數據庫連接失敗',
      error: error.message
    }, { status: 500 })
  }
}