const { client } = await import('../../../../back/db/postgres/index.js')
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding'
import { sha256 } from '@oslojs/crypto/sha2'

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20) // резервируем область памяти 20 байт
  crypto.getRandomValues(bytes) // заполняем область памяти рандомными данными

  // кодируем данные по методу base32, см. https://encoding.oslojs.dev/
  const token = encodeBase32LowerCaseNoPadding(bytes)
  return token
}

// create Session and insert into DB
export async function createSession(token: string, userId: number): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  const session: Session = {
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

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
  const res = await client.query({
    rowMode: 'array',
    text: `SELECT user_session.id, user_session.user_id, user_session.expires_at, app_user.id FROM user_session INNER JOIN user ON app_user.id = user_session.user_id WHERE id = ${sessionId}`,
  })

  if (res === null || res === undefined) {
    return { session: null, user: null }
  }

  const session: Session = {
    id: res.rows[0].id,
    userId: res.rows[1].user_id,
    expiresAt: res.rows[2],
  }
  const user: User = {
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

export async function invalidateSession(sessionId: string): Promise<void> {
  // TODO
}

export type SessionValidationResult = { session: Session; user: User } | { session: null; user: null }

export interface Session {
  id: string
  userId: number
  expiresAt: Date
}

export interface User {
  id: number
}
