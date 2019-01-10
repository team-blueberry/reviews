// Command Arguments:

var args = process.argv.slice(2);

console.log('args:', args);

if (args.length < 4) {
  console.log('Please run with command line arguments:');
  console.log('output-filename total-entries starting-index entries-per-batch');
  process.exit();
}

let outputPath = __dirname + '/temp/' + args[0];
let totalEntries = parseInt(args[1]);
let startingIndex = parseInt(args[2]);
let entriesPerBatch = parseInt(args[3]);

// Dependencies
const fs = require('fs');

const generator = require(__dirname + '/generate-review.js');
generator.setConfig({ REVIEW_COUNT: totalEntries });

const file = fs.createWriteStream(outputPath);

// Function addapted from node docs: https://nodejs.org/dist/v5.7.1/docs/api/stream.html#stream_event_drain
function writeNTimes(n, writer, encoding, callback) {
  var i = startingIndex;
  // Write file header
  writer.write(generator.reviewHeader, encoding);
  write();

  function write() {
    var ok = true;
    let data;
    do {
      data = generator.getReview(i, '\t');
      if (i === n) {
        // last time
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
      i += 1;
    } while (i < n && ok);
    if (i < n) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
}

// writeNTimes(1000000, file, 'utf8', () => {
//   console.log('done writing to file');
// });

writeNTimes(entriesPerBatch, file, 'utf8', () => {
  console.log('done writing to file');
});
