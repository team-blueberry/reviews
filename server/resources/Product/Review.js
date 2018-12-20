const mongoose = require('mongoose');

let reviewSchema = mongoose.Schema({
  reviewId: Number,
  pageId: Number,
  stars: Number,
  username: String,
  text: String,
  title: String,
  verified: Boolean,
  helpful: Number,
  profilepicture: String,
  date: String,
  images: Array
});

var Review = mongoose.model('Review', reviewSchema);

module.exports = Review;