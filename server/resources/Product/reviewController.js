const Review = require('./Review');


//This function sends back all reviews in database.
module.exports.retrieve = (req, res) => {
  Review.find().sort({pageId: 1}).exec()
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
  let reviewNum = Number(req.params.number.substring(1));
  Review.find({pageId : reviewNum}).exec()
  .then(reviews => {
    res.send(reviews);
  })
  .catch(err => {
    console.log(err)
    res.sendStatus(500);
  })
}