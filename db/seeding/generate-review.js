////////////////////////////////////////
//  Dependencies and Configuration

let casual = require('casual');

//  Source Data
let profileImages = require(__dirname + '/source-data/profile-images.json');
let reviewImages = require(__dirname + '/source-data/review-images.json');

//  Module Options and Constants
let config = {
  REVIEW_COUNT: 100000,
  DATE_RANGE_IN_MONTHS: 3,
  MAX_REVIEW_IMAGES: 7,
  MAX_HELPFUL: 500,
  MAX_REVIEW_SENTENCES: 5
};

//  Module Configuration
module.exports.setConfig = newConfig => {
  config = Object.assign(config, newConfig);
};

module.exports.config = config;

// Review Header for TSV Files
let reviewHeader = [
  'reviewId',
  'date',
  'helpful',
  'images ',
  'name',
  'pageId',
  'profilepicture',
  'stars',
  'text',
  'title',
  'username',
  'verified'
];

module.exports.reviewHeader = reviewHeader.join('\t') + '\n';

////////////////////////////////////////
//  Helper Functions

const getDate = () => {
  const DAYS_PER_MONTH = 30;
  const UNIX_MILLISECONDS_PER_DAY = 86400000;

  let randomMoment = Math.round(
    Math.random() *
      config.DATE_RANGE_IN_MONTHS *
      DAYS_PER_MONTH *
      UNIX_MILLISECONDS_PER_DAY
  );

  // Now in unix time
  let now = new Date().getTime();
  return new Date(now - randomMoment).toLocaleString().split(',')[0];
};

const getHelpful = () => {
  return Math.round(Math.random() * config.MAX_HELPFUL);
};

const getImages = () => {
  if (Math.random() > 0.25) {
    return '[]';
  }

  return JSON.stringify(
    getRandomElements(
      reviewImages,
      1 + Math.floor(Math.random() * config.MAX_REVIEW_IMAGES)
    )
  );
};

const getPageId = () => {
  return Math.round(Math.random() * config.REVIEW_COUNT);
};

const getName = () => {
  return casual.full_name;
};

const getProfilePicture = () => {
  return JSON.stringify(getRandomElements(profileImages, 1));
};

const getStars = () => {
  const MAX_STARS = 5;
  const DECIMAL_PLACES = 1;
  let result = parseFloat(
    (Math.random() * MAX_STARS).toString().slice(0, 2 + DECIMAL_PLACES)
  );
  return result;
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

const getText = () => {
  return casual.sentences(
    1 + Math.round(Math.random() * config.MAX_REVIEW_SENTENCES)
  );
};

const getTitle = () => {
  return casual.title;
};

const getUsername = fullName => {
  return fullName
    .split(' ')
    .join('')
    .toLowerCase();
};

const getVerified = () => {
  return Math.random() > 0.5;
};

////////////////////////////////////////
//  Main Generator Function

//  Generate A Review Using Helper Functions
const getReview = (id, delimiter = '\t') => {
  let name = getName();

  let username = getUsername(name);

  // reviewId, date, helpful, images, name, pageId, profilePicture, stars, text, title, username, verified
  let content = [
    id,
    getDate(),
    getHelpful(),
    getImages(),
    name,
    getPageId(),
    getProfilePicture(),
    getStars(),
    getText(),
    getTitle(),
    username,
    getVerified()
  ];

  return content.join(delimiter) + '\n';
};

module.exports.getReview = getReview;
