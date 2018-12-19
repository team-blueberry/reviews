const mongoose = require('mongoose');

let reviewSchema = mongoose.Schema({
  stars: Number,
  username: String,
  text: String,
  title: String,
  verified: Boolean,
  helpful: Number,
  images: Array
});

var Review = mongoose.model('Review', reviewSchema);

module.exports = Review;