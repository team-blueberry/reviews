var args = process.argv.slice(2);

if (args.length < 4) {
  console.log('Please run with command line arguments:');
  console.log('fileName totalPages startingIndex entriesInFile');
  process.exit();
}

let fileName = args[0];
let totalPages = parseInt(args[1]);
let startingIndex = parseInt(args[2]);
let entriesInFile = parseInt(args[3]);

// Dependencies
const fs = require('fs');

const generator = require(__dirname + '/generate-review.js');
generator.setConfig({ REVIEW_COUNT: totalPages });

// Function addapted from node docs: https://nodejs.org/dist/v5.7.1/docs/api/stream.html#stream_event_drain
let writeEntries = (file, entriesInFile, startingIndex, callback) => {
  let i = startingIndex;
  let endingIndex = startingIndex + entriesInFile;
  // Write file header
  file.write(generator.reviewHeader, 'utf8');
  write();

  function write() {
    var ok = true;
    let data;
    do {
      data = generator.getReview(i, '\t');
      if (i === endingIndex) {
        // last time
        file.write(data, 'utf8', callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = file.write(data, 'utf8');
      }
      i += 1;
    } while (i < endingIndex && ok);
    if (i < endingIndex) {
      // had to stop early!
      // write some more once it drains
      file.once('drain', write);
    }
  }
}

const createFile = (fileName, startingIndex, entriesInFile, callback) => {
  const outputPath = __dirname + '/temp/' + fileName;
  const file = fs.createWriteStream(outputPath);

  writeEntries(file, entriesInFile, startingIndex, callback);
}

createFile(fileName, startingIndex, entriesInFile, () => {
  console.log('done writing: ' + fileName);
});