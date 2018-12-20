const reviewController = require('./reviewController.js');
const reviewRouter = require('express').Router();

reviewRouter.get('/listing', reviewController.retrieve);
reviewRouter.get('/listing/:number', reviewController.retrieveOne);

module.exports = reviewRouter;