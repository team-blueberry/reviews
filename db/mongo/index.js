////////////////////////////////////////////////////////////
//
//    Connect to DB and Export Connection

const db = {};

/////////////////////////////////////////
//  Import ORM and connect to db

const mongoose = require('mongoose');

mongoose.Promise = Promise;

mongoose.connect(
  'mongodb://localhost/reviews',
  { useNewUrlParser: true }
);

db.connection = mongoose.connection;

db.connection.on('error', err => {
  console.log('Error connecting to database', err);
});

db.connection.once('open', () => {
  console.log('Successfully connected to database');
});

const { reviewSchema, Review } = require('./schema.js');

db.Review = Review;
db.reviewSchema = reviewSchema;

// Define controller functions
db.getByPageId = pageId => {
  return Review.find({ pageId: pageId }).exec();
};

module.exports = db;