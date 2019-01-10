var prettyHrtime = require('pretty-hrtime');

let moduleTimes = [];

class Timer {
  constructor(func) {
    this.start = process.hrtime();
    this.name = func.name;
  }

  stop() {
    this.end = process.hrtime(this.start);
    moduleTimes.push({
      name: this.name,
      time: this.end
    });
  }
}

let logTimes = () => {
  moduleTimes.sort((a, b) => {
    a.time - b.time;
  });
  console.log('- - - - - - Function times: - - - - - -');
  for (let t of moduleTimes) {
    console.log(' ● ', t.name, prettyHrtime(t.end));
  }
  console.log('- - - - - - - - - - - - - - - - - - ');
};

let reset = () => {
  moduleTimes = [];
};

module.exports.Timer = Timer;
module.exports.logTimes = logTimes;
module.exports.reset = reset;
