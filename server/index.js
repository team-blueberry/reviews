// Dependencies
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const compression = require('compression');
const expressStaticGzip = require('express-static-gzip');

// Controller Functions
const reviewController = require('./reviewController.js');

// Compression middleware filter
const filterApiRequests = (req, res) => {
  // Only compress requests to api
  if (/\/api\/reviews\//.test(req.baseUrl)) {
    return compression.filter(req, res);
  }

  // Otherwise expressStaticGzip should handle compression
  return false;
};

// Configuration
const port = process.env.PORT || 3013;

const app = express();
app.disable('x-powered-by');

app.use(morgan('dev'));
app.use(compression({ filter: filterApiRequests }));

// HTTP Cache Control Constants in ms
const ONE_DAY = 1 * 24 * 60 * 60 * 1000;

// Client Endpoints
app.use(
  '/:id(\\d+)/',
  expressStaticGzip(path.join(__dirname, '../client/dist'), { maxAge: ONE_DAY })
);
app.use('/', expressStaticGzip(path.join(__dirname, '../client/dist'), { maxAge: ONE_DAY }));

// API Endpoints
app.get('/api/reviews/:number', reviewController.retrieveOne);

// Load Test Verification
// For verification, the load testing service loader.io sends requests to an
// endpoint beginning with loaderio- that ends with a hash related to the
// server's IP. This route responds to those requests with text that represents
// that endpoint.
app.get('/loaderio-(*)/', (req, res) => {
  res.send(req.url.replace('/','').replace('.txt','').replace('.html',''));
})

app.listen(port, () => {
  console.log(`Reviews component server listing on port# ${port}`);
});
