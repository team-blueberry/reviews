//////////////////////////////////////
//  Example Entry

// {
// 	"reviewId" : 1,
// 	"date" : "7/21/1370",
// 	"helpful" : 210,
// 	"images" : [
// 		"http://dummyimage.com/196x244.png/ff4444/ffffff"
// 	],
// 	"name" : "Alec Yarrall",
// 	"pageId" : 15,
// 	"profilepicture" : "http://dummyimage.com/40x40.jpg/cc0000/ffffff",
// 	"stars" : 1.5,
// 	"text" : "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
// 	"title" : "vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus",
// 	"username" : "ayarrall0",
// 	"verified" : true
// }

const mongoose = require('mongoose');

let reviewSchema = new mongoose.Schema({
  "reviewId" : {type: String, unique: true},
  "date" : {type: String, required: true},
  "helpful" : {type: Number, required: true},
  "images" : {type: [String], required: true},
  "name" : {type: String, required: true},
  "pageId" : {type: Number, required: true},
  "profilepicture" : {type: String, required: true},
  "stars" : {type: Number, required: true},
  "text" : {type: String, required: true},
  "title" : {type: String, required: true},
  "username" : {type: String, required: true},
  "verified" : {type: Boolean, required: true}
})

let casual = require('casual');

////////////////////////////////////////
//  Constants
const REVIEW_COUNT = 700;

const DATE_RANGE_IN_MONTHS = 3;

const MAX_HELPFUL = 500;
const MAX_REVIEW_SENTENCES = 12;

const getReview = (id) => {
  return {
    reviewId: id,
    date : formatDateString(getDateInPastMonths(DATE_RANGE_IN_MONTHS)),
    helpful : Math.round(Math.random() * MAX_HELPFUL),
    // images : array of 1 to 9 strings,
    name : casual.full_name,
    pageId : Math.round(Math.random() * REVIEW_COUNT),
    // profilepicture : url string 40x40,
    stars : getRandomStars(),
    text : casual.sentences(1 + Math.round(Math.random() * MAX_REVIEW_SENTENCES)),
    title : casual.title,
    username : casual.username,
    verified : (Math.random() > 0.5)
  }
}

const getDateInPastMonths = (months) => {
  const DAYS_PER_MONTH = 30;
  const UNIX_MILLISECONDS_PER_DAY = 86400000;

  let randomMoment = Math.round(
    Math.random() *
    months * DAYS_PER_MONTH * UNIX_MILLISECONDS_PER_DAY
    );

  // Now in unix time
  let now = new Date().getTime();
  return new Date(now - randomMoment);
}

const formatDateString = (date) => {
  return date.toLocaleString().split(',')[0];
}

const getRandomStars = () => {
  const MAX_STARS = 5;
  const DECIMAL_PLACES = 1;
  return parseFloat((Math.random() * MAX_STARS).toString().slice(0, 2 + DECIMAL_PLACES))
}


console.log('Review:', getReview());