const cp = require('child_process');

cp.execSync('mongo reviews --eval "db.reviews.drop()"');

let insert1 = cp.execSync(
  `mongoimport --db reviews --collection reviews --headerline --type tsv --file ${__dirname}/../temp/out1.tsv`
);

let insert2 = cp.execSync(
  `mongoimport --db reviews --collection reviews --headerline --type tsv --file ${__dirname}/../temp/out2.tsv`
);

let insert3 = cp.execSync(
  `mongoimport --db reviews --collection reviews --headerline --type tsv --file ${__dirname}/../temp/out3.tsv`
);

let insert4 = cp.execSync(
  `mongoimport --db reviews --collection reviews --headerline --type tsv --file ${__dirname}/../temp/out4.tsv`
);

let insert5 = cp.execSync(
  `mongoimport --db reviews --collection reviews --headerline --type tsv --file ${__dirname}/../temp/out5.tsv`
);

let insert6 = cp.execSync(
  `mongoimport --db reviews --collection reviews --headerline --type tsv --file ${__dirname}/../temp/out6.tsv`
);

let insert7 = cp.execSync(
  `mongoimport --db reviews --collection reviews --headerline --type tsv --file ${__dirname}/../temp/out7.tsv`
);

// Create index for pageId
let index = cp.execSync(
  'mongo reviews --eval "db.reviews.createIndex({pageId:1})"'
);

