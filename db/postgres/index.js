const { Pool, Client } = require('pg');
const config = require('../../config.json');

const pool = new Pool({
  user: config.postgres.USER,
  password: config.postgres.PASSWORD,
  host: config.postgres.HOST,
  database: "reviews",
  port: config.postgres.PORT
});

const db = {};

db.getByPageId = pageId => {
  return pool.query('SELECT * FROM reviews WHERE pageid = $1', [pageId]);
};

db.disconnect = () => {
  pool.end();
};

module.exports = db;
