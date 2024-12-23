import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default async function handler(req, res) {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    res.status(200).json({ success: true, time: result.rows[0].now, message: '數據庫連接成功！' });
  } catch (err) {
    res.status(500).json({ success: false, message: '數據庫連接失敗', error: err.message });
  }
}