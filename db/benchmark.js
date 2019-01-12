const mongo = require('./mongo/index.js');
// const postgres = require('./postgres/index.js');
var prettyHrtime = require('pretty-hrtime');

let randomRange = (min, max) => {
  let range = max - min;
  return min + Math.floor(Math.random() * range);
}

const QUERY_COUNT = 10000;
let queries = [];

for (let i = 0; i < QUERY_COUNT; i++) {
  queries.push(randomRange(63000000, 70000000));
}

let mongoQueries = queries.slice();
let postgresQueries = queries.slice();

let start = process.hrtime();

Promise.all(
mongoQueries.map(e => {
   return mongo.getByPageId(e);
}))
.then((result) => {
  let end = process.hrtime(start);
  console.log(`Mongo query time for ${QUERY_COUNT} queries:`, prettyHrtime(end));
})
.catch((err) => {
  console.log('Error running mongo queries:', err);
})


// Promise.all(
//   postgresQueries.map(e => {
//      return postgresQueries.getByPageId(e);
//   }))
//   .then((result) => {
//     let end = process.hrtime(start);
//     console.log(`PostgreSQL query time for ${QUERY_COUNT} queries:`, prettyHrtime(end));
//   })
//   .catch((err) => {
//     console.log('Error running PostgreSQL queries:', err);
//   })
