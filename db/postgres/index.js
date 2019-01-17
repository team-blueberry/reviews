const { Pool, Client } = require('pg');
require('dotenv').config()

console.log('env variables:', process.env)

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  client.query('SELECT NOW()', (err, result) => {
    release()
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log('Sucessfully connected to database at:', result.rows);
  })
})


const db = {};

db.getByPageId = pageId => {
  return pool.query('SELECT * FROM reviews WHERE pageid = $1', [pageId]);
};

db.disconnect = () => {
  pool.end();
};

module.exports = db;
