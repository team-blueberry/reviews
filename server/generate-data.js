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
  MAX_REVIEW_IMAGES: 8,
  MAX_HELPFUL: 500,
  MAX_REVIEW_SENTENCES: 12
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

//TODO: Move to Mongo specific file
const mongoose = require('mongoose');
let reviewSchema = new mongoose.Schema({
  reviewId: { type: String, unique: true },
  date: { type: String, required: true },
  helpful: { type: Number, required: true },
  images: { type: [String], required: true },
  name: { type: String, required: true },
  pageId: { type: Number, required: true },
  profilepicture: { type: String, required: true },
  stars: { type: Number, required: true },
  text: { type: String, required: true },
  title: { type: String, required: true },
  username: { type: String, required: true },
  verified: { type: Boolean, required: true }
});

let outputPath = './generated-output.txt';

const fs = require('fs');

const file = fs.createWriteStream(outputPath);

for (var i = 0; i < generatorOptions.REVIEW_COUNT; i++) {
  file.write(getReviewString(i, '\t'));
}
