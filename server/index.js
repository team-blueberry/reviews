// Benchmarking
require('newrelic');

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

app.use(morgan('dev'));
app.use(compression({ filter: filterApiRequests }));

// Client Endpoints
app.use(
  '/:id(\\d+)/',
  expressStaticGzip(path.join(__dirname, '../client/dist'))
);
app.use('/', expressStaticGzip(path.join(__dirname, '../client/dist')));

// API Endpoints
app.use('/api/reviews/:number', reviewController.retrieveOne);

app.listen(port, () => {
  console.log(`Reviews component server listing on port# ${port}`);
});
