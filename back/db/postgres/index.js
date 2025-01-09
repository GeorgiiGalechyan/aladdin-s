import Pool from 'pg-pool'

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

pool.connect(function (err) {
  if (err) throw err
  pool.query('SELECT VERSION()', [], function (err, result) {
    if (err) throw err

    console.log(result.rows[0].version)
    pool.end(function (err) {
      if (err) throw err
    })
  })
})

// export { client as db }
