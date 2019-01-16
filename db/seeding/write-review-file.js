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
const ProgressBar = require('progress');

var bar = new ProgressBar('  writing [:bar] :percent :etas', {
  complete: '=',
  incomplete: ' ',
  width: 20,
  total: entriesInFile,
  // clear: false,
  stream: process.stdout
});

const generator = require(__dirname + '/generate-review.js');
generator.setConfig({ REVIEW_COUNT: totalPages });

// Function adapted from node docs: https://nodejs.org/dist/v5.7.1/docs/api/stream.html#stream_event_drain
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
      if (i === endingIndex - 1) {
        // last time
        file.write(data, 'utf8', callback);
        bar.tick();
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = file.write(data, 'utf8');
        bar.tick();
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

const formatMillis = ms => {
  let s = ms / 1000;
  let m = Math.floor(s / 60);
  let h = Math.floor(s / 3600);
  s = ((s % 3600) % 60).toFixed(3);
  m = m % 60;
  return `${h}h ${m}m ${s}s`;
};

const createFile = (fileName, startingIndex, entriesInFile, callback) => {
  const outputPath = __dirname + '/temp/' + fileName;
  const file = fs.createWriteStream(outputPath);

  let start = new Date();
  console.log(
    `Beginning writing to file ${fileName} at: ${start.toLocaleString()}`
  );

  let completedCB = () => {
    let end = new Date();
    let elapsed = end - start;
    console.log(`Completed writing at: ${end.toLocaleString()} \nTotal time: ${formatMillis(elapsed)}`);
  };

  writeEntries(file, entriesInFile, startingIndex, completedCB);
};

createFile(fileName, startingIndex, entriesInFile);
