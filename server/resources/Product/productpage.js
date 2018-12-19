const mongoose = require('mongoose');

let productSchema = mongoose.Schema({
  reviews: Array,
  id: Number
})

let Product = mongoose.model('Product', productSchema)

module.exports = Product;