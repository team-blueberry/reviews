const reviewController = require('./reviewController.js');
const reviewsRouter = require('express').Router();

reviewsRouter.get('/:number', reviewController.retrieveOne);

module.exports = reviewsRouter;