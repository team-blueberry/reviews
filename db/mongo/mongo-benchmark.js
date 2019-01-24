var args = process.argv.slice(2);

if (args.length < 1) {
  console.log('Please run with command line arguments:');
  console.log('queryCount');
  process.exit();
}

const QUERY_COUNT = args[0];

const mongo = require('./index.js');
var prettyHrtime = require('pretty-hrtime');

let randomRange = (min, max) => {
  let range = max - min;
  return min + Math.floor(Math.random() * range);
};

let queries = [];

for (let i = 0; i < QUERY_COUNT; i++) {
  queries.push(randomRange(63000000, 70000000));
}

let mongoQueries = queries.slice();

let start = process.hrtime();

Promise.all(
  mongoQueries.map(e => {
    return mongo.getByPageId(e);
  })
)
  .then(result => {
    let end = process.hrtime(start);
    console.log(
      `Mongo query time for ${QUERY_COUNT} queries:`,
      prettyHrtime(end)
    );
    mongo.disconnect();
  })
  .catch(err => {
    console.log('Error running mongo queries:', err);
  });