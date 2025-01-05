import pg from 'pg'
import { config } from './config.js'

// Disable prerender so that ENV variables are updated on the fly.???
// export const prerender = false

// const config = {
//   user: import.meta.env.PG_USER,
//   password: import.meta.env.PG_PASS,
//   host: import.meta.env.PG_HOST,
//   port: import.meta.env.PG_PORT,
//   database: import.meta.env.PG_DB,
//   ssl: {
//     rejectUnauthorized: true,
//     ca: import.meta.env.PG_SSL_CA,
//   },
// }
console.log(config)

const client = new pg.Client(config)
client.connect(function (err) {
  if (err) throw err
  client.query('SELECT VERSION()', [], function (err, result) {
    if (err) throw err

    console.log(result.rows[0].version)
    client.end(function (err) {
      if (err) throw err
    })
  })
})

// export { client as db }
