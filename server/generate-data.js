//  Dependencies
let casual = require('casual');

//  Source Data
let profileImages = require('../data/profile-images.json');
let reviewImages = require('../data/review-images.json');

//  Module Options and Constants
let generatorOptions = {
  REVIEW_COUNT: 100000
  // REVIEW_COUNT: 10000
};

let generatorConstants = {
  DATE_RANGE_IN_MONTHS: 3,
  MAX_REVIEW_IMAGES: 4,
  MAX_HELPFUL: 500,
  MAX_REVIEW_SENTENCES: 5
};

//  Module Configuration
module.exports.setOptionReviewCount = reviewCount => {
  generatorOptions.REVIEW_COUNT = reviewCount;
};

//  Helper Functions

const getDateInPastMonths = months => {
  const DAYS_PER_MONTH = 30;
  const UNIX_MILLISECONDS_PER_DAY = 86400000;

  let randomMoment = Math.round(
    Math.random() * months * DAYS_PER_MONTH * UNIX_MILLISECONDS_PER_DAY
  );

  // Now in unix time
  let now = new Date().getTime();
  return new Date(now - randomMoment);
};

const formatDateString = date => {
  return date.toLocaleString().split(',')[0];
};

const getRandomStars = () => {
  const MAX_STARS = 5;
  const DECIMAL_PLACES = 1;
  return parseFloat(
    (Math.random() * MAX_STARS).toString().slice(0, 2 + DECIMAL_PLACES)
  );
};

const getRandomElements = (array, count) => {
  count = Math.min(array.length, count);

  let result = [];
  let selected = {};
  let randomIndex;

  while (result.length < count) {
    randomIndex = Math.floor(Math.random() * array.length);
    if (selected[randomIndex] === undefined) {
      result.push(array[randomIndex]);
      selected[randomIndex] = randomIndex;
    }
  }

  return result;
};

const getUserName = name => {
  name = name.toLowerCase();

  let style = Math.floor(Math.random() * 5);

  if (style === 0) {
    return name.split(' ').join('-') + Math.floor(Math.random() * 100);
  }

  if (style === 1) {
    return name.split(' ').join('') + Math.floor(Math.random() * 1000);
  }

  if (style === 2) {
    return name.split(' ').join('.') + Math.floor(Math.random() * 10);
  }

  if (style === 3) {
    return name.split(' ')[1];
  }

  if (style === 4) {
    return (
      name.split(' ')[0][0] +
      name.split(' ')[1] +
      Math.floor(Math.random() * 10)
    );
  }
};

//  Generate A Review Using Helper Functions

//TODO: Export and test this function
const getReview = id => {
  let name = casual.full_name;
  let username = getUserName(name);

  return {
    reviewId: id,
    date: formatDateString(
      getDateInPastMonths(generatorConstants.DATE_RANGE_IN_MONTHS)
    ),
    helpful: Math.round(Math.random() * MAX_HELPFUL),
    images: getRandomElements(
      reviewImages,
      1 + Math.floor(Math.random() * generatorConstants.MAX_REVIEW_IMAGES)
    ),
    name: name,
    pageId: Math.round(Math.random() * generatorOptions.REVIEW_COUNT),
    profilepicture: getRandomElements(profileImages, 1),
    stars: getRandomStars(),
    text: casual.sentences(
      1 + Math.round(Math.random() * generatorConstants.MAX_REVIEW_SENTENCES)
    ),
    title: casual.title,
    username: username,
    verified: Math.random() > 0.5
  };
};

const getReviewString = (id, delimiter) => {
  let name = casual.full_name;
  let username = getUserName(name);
  let content = [
    // reviewId:
    id,
    // date:
    formatDateString(
      getDateInPastMonths(generatorConstants.DATE_RANGE_IN_MONTHS)
    ),
    // helpful:
    Math.round(Math.random() * generatorConstants.MAX_HELPFUL),
    // images :
    getRandomElements(
      reviewImages,
      1 + Math.floor(Math.random() * generatorConstants.MAX_REVIEW_IMAGES)
    ),
    // name:
    name,
    // pageId:
    Math.round(Math.random() * generatorOptions.REVIEW_COUNT),
    // profilepicture :
    getRandomElements(profileImages, 1),
    // stars:
    getRandomStars(),
    // text:
    casual.sentences(
      1 + Math.round(Math.random() * generatorConstants.MAX_REVIEW_SENTENCES)
    ),
    // title:
    casual.title,
    // username:
    username,
    // verified:
    Math.random() > 0.5
  ];
  return (
    content
      .map(e => {
        return JSON.stringify(e);
      })
      .join(delimiter) + '\n'
  );
};

// Create output tsv file
let outputPath = './generated-output.tsv';

const fs = require('fs');

const file = fs.createWriteStream(outputPath);

let reviewHeader = ['reviewId', 'date', 'helpful', 'images ', 'name', 'pageId', 'profilepicture', 'stars', 'text', 'title', 'username', 'verified'];
let reviewHeaderLine = reviewHeader.join('\t') + '\n';


function writeNTimes(n, writer, encoding, callback) {
  var i = 0;
  let fullBufferCount = 0;
  // account for header line in file
  n += 1;
  write();

  function write() {
    var ok = true;
    let data;
    do {
      i += 1;
      data = getReviewString(i, '\t');
      if (i === 1) {
        // first time
        writer.write(reviewHeaderLine, encoding);
      }
      if (i === n) {
        // last time
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i < n && ok);
    if (i < n) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
}

writeNTimes(1000000, file, 'utf8', () => {
  console.log('done writing to file');
});
