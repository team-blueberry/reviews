const Review = require('./Review');

module.exports.retrieve = (req, res) => {
  Review.find().sort({reviewId: 1}).exec()
  .then((reviews) => {
    res.send(reviews)
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(500);
  })
}

