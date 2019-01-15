const cp = require('child_process');
const path = require('path');

const tsvWriter = path.join(__dirname, 'write-review-file.js');

const PAGES = 10e6;
const REVIEWS = 70e6;
const BATCH_COUNT = 7;

let reviewsPerBatch = REVIEWS / BATCH_COUNT;

for (let i = 0; i < BATCH_COUNT; i++) {
  // Create a temp TSV file
  cp.fork(tsvWriter, [`out${i}.tsv`, PAGES, i * reviewsPerBatch, reviewsPerBatch]);
}