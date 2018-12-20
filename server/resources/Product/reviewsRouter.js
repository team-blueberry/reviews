const reviewController = require('./reviewController.js');
const reviewsRouter = require('express').Router();

reviewsRouter.get('/listing', reviewController.retrieve);
reviewsRouter.get('/listing/:number', reviewController.retrieveOne);

module.exports = reviewsRouter;