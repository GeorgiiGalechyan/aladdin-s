import * as argon2 from '@node-rs/argon2'
const { client } = await import('../../../../back/db/postgres/index')

async function regUser(req:, res, body) {
  const username = body.username as string
  const pass = body.pass as string

  const password_hash = await argon2.hash(pass)
  const result = await client
    .query(
      `
    INSERT INTO app_user(username, password_hash) VALUES ($1, $2) RETURNING id
    `.trim(),
      [username, password_hash]
    )
    .catch((e) => {
      throw e
    })
}

async function verifyRegData(username: string) {}
