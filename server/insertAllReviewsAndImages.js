const Review = require('./resources/Product/Review.js');
const fs = require('fs');
const db = require('./db/index.js')
const imageObj = require('../data/imageObjectCreator.js')




var insertAllReviews = () => {
  imageObj((imgObject) => {
    var reviewData;
    fs.readFile('../data/Reviews.json', 'utf8', (err, data) => {
      if (err) {
        throw err;
      } else {

        reviewData = JSON.parse(data);
        reviewData.forEach((review) => {
          Review.findOneAndUpdate({
            reviewId: review.reviewId
          }, {
            reviewId: review.reviewId,
            stars: review.stars,
            verified: review.verified,
            username: review.username,
            name: review.name,
            title: review.title,
            text: review.text,
            helpful: review.helpful,
            pageId: review.pageId,
            date: review.date,
            images: imgObject[review.reviewId.toString()],
            profilepicture: review.profilepicture
          }, {
            upsert: true
          }).exec((err) => {
            if (err) {
              console.log(err)
            }
          });
        });
      }
    });
  })

}

// var insertAllImages = () => {
//   var imageData;
//   fs.readFile('../data/image_data.json', 'utf8', (err, data) => {
//     if (err) {
//       throw err;
//     } else {
//       imageData = JSON.parse(data);
//       imageData.forEach((img) => {
//         var newImage = new Image({
//           image: img.image,
//           reviewId: img.reviewId
//         })
//         newImage.save((err) => {
//           if (err) {
//             throw err;
//           }
//         })
//       });
//     }
//   });
// }

insertAllReviews()
// insertAllImages()