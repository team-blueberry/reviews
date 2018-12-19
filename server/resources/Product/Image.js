const mongoose = require('mongoose');

let imageSchema = mongoose.Schema({
  reviewId: Number,
  image: String
})

let Image = mongoose.model('Image', imageSchema)

module.exports = Image;