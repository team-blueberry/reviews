const express = require('express');
const morgan = require('morgan');
const db = require('./db/index.js');
const reviewsRouter = require('./resources/Product/reviewsRouter.js');
const path = require('path');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../react-client/dist')));
app.use('/', reviewsRouter)

module.exports = app;