const express = require('express');
const morgan = require('morgan');
const db = require('./db/index.js');
const reviewRouter = require('./resources/Product/reviewRouter.js');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(__dirname + '../react-client/dist'));
app.use('/', reviewRouter)

module.exports = app;