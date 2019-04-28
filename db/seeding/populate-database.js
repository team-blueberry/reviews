const cp = require('child_process');
const path = require('path');

const tsvWriter = path.join(__dirname, 'write-review-file.js');

const PAGES = 10e6;
const REVIEWS = 70e6;
const BATCH_COUNT = 7;

const DATABASE = 'reviews';
const TABLE = 'reviews';

let reviewsPerBatch = REVIEWS / BATCH_COUNT;

console.log(`Clearing table reviews`);

cp.execSync(
  `psql -U postgres -d ${DATABASE} -c "DROP TABLE IF EXISTS ${TABLE};"`
);

cp.execSync(
  `psql -U postgres -d ${DATABASE} -f '${__dirname}/postgresql/schema.sql'`
);

let createTSVCommand;

for (let i = 0; i < BATCH_COUNT; i++) {
  // Create a temp TSV file
  createTSVCommand = `node ${tsvWriter} out${i}.tsv ${PAGES} ${i * reviewsPerBatch} ${reviewsPerBatch}`;
  cp.execSync(createTSVCommand);

  cp.execSync(
    `psql -U postgres -d ${DATABASE} -c "COPY ${TABLE} (reviewId, date, helpful, images, name, pageId, profilepicture, stars, text, title, username, verified) FROM '${__dirname}/temp/out${i}.tsv' WITH CSV DELIMITER E'\t' QUOTE E'\b' HEADER;"`
  );

  console.log(`Batch ${i} completed`);
  cp.execSync(`rm ${__dirname}/temp/out${i}.tsv`);
}

console.log(`Indexing database`);

cp.execSync(
  `psql -U postgres -d ${DATABASE} -c "create index pageid_index on ${TABLE}(pageId ASC NULLS LAST);"`
);