const Review = require('./resources/Product/Review.js');
const Image = require('./resources/Product/Image.js')
const fs = require('fs');
const db = require('./db/index.js')

var insertAllReviews = () => {
  var reviewData;
  fs.readFile('../data/review_data.json', 'utf8', (err, data) => {
    if (err) {
      throw err;
    } else {
      reviewData = JSON.parse(data);
      reviewData.forEach((review) => {
        Review.findOneAndUpdate({reviewId: review.reviewId}, {
          stars: review.stars,
          verified: review.verified,
          username: review.username,
          title: review.title,
          text: review.text,
          helpful: review.helpful,
          pageId: review.pageId,
          date: review.date
        }, {upsert: true}).exec((err) => {
          if (err) {
            console.log(err)
          }
        });
      });
    }
  });
}

var insertAllImages = () => {
  var imageData;
  fs.readFile('../data/image_data.json', 'utf8', (err, data) => {
    if (err) {
      throw err;
    } else {
      imageData = JSON.parse(data);
      imageData.forEach((img) => {
        var newImage = new Image({
          image: img.image,
          reviewId: img.reviewId
        })
        newImage.save((err) => {
          if (err) {
            throw err;
          }
        })
      });
    }
  });
}

insertAllReviews()
insertAllImages()