const express = require('express');
const morgan = require('morgan');
const db = require('./db/index.js');
const reviewsRouter = require('./resources/Product/reviewsRouter.js');
const path = require('path');
const compression = require('compression');
const cors = require('cors')

const app = express();

app.use(cors())
app.use(morgan('dev'));
app.use(compression())
app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/listing', reviewsRouter)


module.exports = app;