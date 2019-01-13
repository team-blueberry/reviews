const cp = require('child_process');
const config = require(__dirname + '/../../../config.json');

cp.execSync(
  `psql -d reviews -c "DROP TABLE IF EXISTS reviews;"`
  );

cp.execSync(
  `psql -d reviews -f ${__dirname + '/schema.sql'}`
);

console.log('Table dropped and created from scratch');

let insert1 = cp.execSync(
  `psql -d reviews -c "COPY reviews (reviewId, date, helpful, images, name, pageId, profilepicture, stars, text, title, username, verified) FROM '${__dirname}/../temp/out1.tsv' DELIMITER E'\t' CSV HEADER;"`,
  () => {
    console.log('insert 1 completed');
  }
);

let insert2 = cp.exec(
  `psql -d reviews -c "COPY reviews (reviewId, date, helpful, images, name, pageId, profilepicture, stars, text, title, username, verified) FROM '${__dirname}/../temp/out2.tsv' DELIMITER E'\t' CSV HEADER;"`,
  () => {
    console.log('insert 2 completed');
  }
);

let insert3 = cp.exec(
  `psql -d reviews -c "COPY reviews (reviewId, date, helpful, images, name, pageId, profilepicture, stars, text, title, username, verified) FROM '${__dirname}/../temp/out3.tsv' DELIMITER E'\t' CSV HEADER;"`,
  () => {
    console.log('insert 3 completed');
  }
);

let insert4 = cp.exec(
  `psql -d reviews -c "COPY reviews (reviewId, date, helpful, images, name, pageId, profilepicture, stars, text, title, username, verified) FROM '${__dirname}/../temp/out4.tsv' DELIMITER E'\t' CSV HEADER;"`,
  () => {
    console.log('insert 4 completed');
  }
);

let insert5 = cp.exec(
  `psql -d reviews -c "COPY reviews (reviewId, date, helpful, images, name, pageId, profilepicture, stars, text, title, username, verified) FROM '${__dirname}/../temp/out5.tsv' DELIMITER E'\t' CSV HEADER;"`,
  () => {
    console.log('insert 5 completed');
  }
);

let insert6 = cp.exec(
  `psql -d reviews -c "COPY reviews (reviewId, date, helpful, images, name, pageId, profilepicture, stars, text, title, username, verified) FROM '${__dirname}/../temp/out6.tsv' DELIMITER E'\t' CSV HEADER;"`,
  () => {
    console.log('insert 6 completed');
  }
);

let insert7 = cp.exec(
  `psql -d reviews -c "COPY reviews (reviewId, date, helpful, images, name, pageId, profilepicture, stars, text, title, username, verified) FROM '${__dirname}/../temp/out7.tsv' DELIMITER E'\t' CSV HEADER;"`,
  () => {
    console.log('insert 7 completed');
  }
  );


