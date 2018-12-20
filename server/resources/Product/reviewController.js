const Review = require('./Review');


//This function sends back all reviews in database.
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


//This function sends back all reviews associated with a particular product page.
module.exports.retrieveOne = (req, res) => { 
  let reviewNum = Number(req.params.substring(1));
  Review.find({reviewId : reviewNum}).exec()
  .then(reviews => {
    res.send(reviews);
  })
  .catch(err => {
    console.log(err)
    res.sendStatus(500);
  })
}