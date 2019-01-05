const express = require('express');
const morgan = require('morgan');
const db = require('./db/index.js');
const reviewsRouter = require('./resources/Product/reviewsRouter.js');
const path = require('path');
const compression = require('compression');

const app = express();


app.use(morgan('dev'));
app.use(compression())
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
 });
app.use('/listing', reviewsRouter)


module.exports = app;