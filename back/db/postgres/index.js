import { Pool } from 'pg'

const config = {
  user: import.meta.env.PG_USER,
  password: import.meta.env.PG_PASS,
  host: import.meta.env.PG_HOST,
  port: import.meta.env.PG_PORT,
  database: import.meta.env.PG_DB,
  ssl: {
    rejectUnauthorized: true,
    ca: import.meta.env.PG_SSL_CA,
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
}

const pool = new Pool(config)

const client = await pool.connect()

export { client }
