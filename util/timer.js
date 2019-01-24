var prettyHrtime = require('pretty-hrtime');

let timeStamps = [];

class Start {
  constructor(name) {
    this.start = process.hrtime();
    this.name = name;
  }

  stop() {
    this.end = process.hrtime(this.start);
    timeStamps.push({
      name: this.name,
      time: this.end
    });
  }
}

let log = () => {
  timeStamps.sort((a, b) => {
    a.time - b.time;
  });

  let totalTime = timeStamps.reduce((a,c) => {return a + c.time}, 0);
  // timeStamps.map((e) => {
  //   let percent = e
  // });

  console.log('- - - - - - Time Stamps: - - - - - -');
  for (let t of timeStamps) {
    console.log('   name     -     time')
    // console.log('name  |  time  |  percentage')
    console.log(' ● ', t.name, prettyHrtime(t.time));
  }
  console.log('- - - - - - - - - - - - - - - - - - ');
};

let reset = () => {
  timeStamps = [];
};

module.exports.Start = Start;
module.exports.log = log;
module.exports.reset = reset;
