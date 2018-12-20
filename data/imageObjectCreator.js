const fs = require('fs');


var createImageObj = (cb) => {
  var imageObj = {};

  fs.readFile('../data/image_data.json', 'utf8', (err, data) => {
    var imageData;
    if (err) {
      throw err;
    } else {
      imageData = JSON.parse(data);
      imageData.forEach((img) => {
        let revNum = img.reviewId
        if (!imageObj[revNum]) {
          imageObj[revNum] = [img.image];
        } else {
          imageObj[revNum].push(img.image);
        }
      })
       cb(imageObj)
    }
  })



}

// var createdImgObj = createImageObj()
module.exports = createImageObj;