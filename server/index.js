// Benchmarking
require('newrelic');

// Dependencies
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const compression = require('compression');

// Controller Functions
const reviewController = require('./reviewController.js');

// Configuration
const port = process.env.PORT || 3013;

const app = express();

app.use(morgan('dev'));
app.use(compression());

// Client Endpoints
app.use('/:id(\\d+)/', express.static(path.join(__dirname, '../client/dist')));
app.use('/', express.static(path.join(__dirname, '../client/dist')));

// API Endpoints
app.use('/api/reviews/:number', reviewController.retrieveOne);

app.listen(port, () => {
  console.log(`Reviews component server listing on port# ${port}`);
});
