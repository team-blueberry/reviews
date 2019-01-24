////////////////////////////////////////////////////////////
//
//    Connect to DB and Export Connection

const db = {};

/////////////////////////////////////////
//  Import ORM and connect to db

const mongoose = require('mongoose');
const config = require('../../config.json');

mongoose.connect(
  `mongodb://${config.mongo.HOST}/${config.mongo.DATABASE}`,
  {
    useNewUrlParser: true,
    useCreateIndex: true
  }
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

// Define controller functions
db.disconnect = () => {
  mongoose.connection.close();
};

module.exports = db;