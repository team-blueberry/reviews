const { Pool, Client } = require('pg');
const config = require('../../config.json');

const pool = new Pool({
  user: config.postgres.USER,
  password: config.postgres.PASSWORD,
  host: config.postgres.HOST,
  database: config.postgres.DATABASE,
  port: config.postgres.PORT
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
