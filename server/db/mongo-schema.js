const mongoose = require('mongoose');

module.exports.reviewSchema = new mongoose.Schema({
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