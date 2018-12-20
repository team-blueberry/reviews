const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost:27017/review'

mongoose.connect(mongoUri, {useNewUrlParser: true}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Database Connected')
  }
})

var db = mongoose.connection;

module.exports = db;