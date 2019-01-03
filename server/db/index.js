const mongoose = require('mongoose');
let mongoUri = ''

if (process.env.mongo_uri) {
  mongoUri = process.env.mongo_uri
} else {
  mongoUri = ('mongodb://localhost:27017/review')
}

mongoose.connect(mongoUri, {useNewUrlParser: true}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Database Connected')
  }
})

var db = mongoose.connection;

module.exports = db;