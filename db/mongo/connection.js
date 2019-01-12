const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'newReviews';

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true });

// Use connect method to connect to the Server
module.exports.db = new Promise((resolve, reject) => {
  client.connect(err => {
    if (err) {
      console.log('Error connecting to database');
      reject();
    }
    console.log('Sucessfully connected to database');
    resolve(client.db(dbName));
  });
});

module.exports.client = client;