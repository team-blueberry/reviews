const db = require('../../../db/postgres/index.js');

module.exports.retrieveOne = (req, res) => {
  let reviewNum = parseInt(req.params.number);

  db.getByPageId(reviewNum)
  .then(queryRes => {
    queryRes.rows.map((e) => {
        return {
          reviewId: e.reviewid,
          pageId: e.pageid,
          stars: e.stars,
          username: e.username,
          text: e.text,
          title: e.title,
          verified: e.verified,
          helpful: e.helpful,
          date: e.date,
          images: e.images,
          profilepicture: e.profilepicture
        }
      })
      res.send(queryRes.rows);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
};
