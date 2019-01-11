const generator = require(__dirname + '/generate-review.js');
generator.setConfig({ REVIEW_COUNT: 1e6 });

const timer = require(__dirname + '/../../util/timer.js');

t = new timer.Start('Generate one review');

generator.getReview(0);

t.stop();

timer.log();