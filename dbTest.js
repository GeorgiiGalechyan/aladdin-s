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

import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding'
import { sha256 } from '@oslojs/crypto/sha2'

export function generateSessionToken() {
  const bytes = new Uint8Array(20) // резервируем область памяти 20 байт
  crypto.getRandomValues(bytes) // заполняем область памяти рандомными данными

  // кодируем данные по методу base32, см. https://encoding.oslojs.dev/
  const token = encodeBase32LowerCaseNoPadding(bytes)
  return token
}

// create Session and insert into DB
export async function createSession(token, userId) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  const session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  }

  await client
    .query(
      `INSERT INTO user_session (id, user_id, expires_at) VALUES (${session.id}, ${session.userId}, ${session.expiresAt})`
    )
    .catch((e) => {
      client.release()
      throw e
    })
    .finally(() => {
      client.release()
    })

  return session
}

export async function validateSessionToken(token) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  const res = await client.query({
    rowMode: 'array',
    text: `SELECT user_session.id, user_session.user_id, user_session.expires_at, app_user.id FROM user_session INNER JOIN user ON app_user.id = user_session.user_id WHERE id = ${sessionId}`,
  })

  if (res === null || res === undefined) {
    return { session: null, user: null }
  }

  const session = {
    id: res.rows[0],
    userId: res.rows[1],
    expiresAt: res.rows[2],
  }
  const user = {
    id: res.rows[3],
  }

  // Если срок сессия истекла, то удаляем данные и возвращаем null
  if (Date.now() >= session.expiresAt.getTime()) {
    await client.query(`DELETE FROM user_session WHERE id = ${session.id}`)
    return { session: null, user: null }
  }

  // Если срок сессии меньше 15 дней, то продлеваем срок истечения сесси
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    await client.query(`UPDATE user_session SET expires_at = ${session.expiresAt} WHERE id = ${session.id}`)
  }
  return { session, user }
}

export async function invalidateSession(sessionId) {
  // TODO
}
