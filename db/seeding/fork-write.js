const cp = require('child_process');

// let child1 = cp.fork('./write-review-file.js', ['out1.tsv', 1000000,       0, 250000]);
// let child2 = cp.fork('./write-review-file.js', ['out2.tsv', 1000000,  250000, 250000]);
// let child3 = cp.fork('./write-review-file.js', ['out3.tsv', 1000000,  500000, 250000]);
// let child4 = cp.fork('./write-review-file.js', ['out4.tsv', 1000000,  750000, 250000]);

let child1 = cp.fork('./write-review-file.js', ['out1.tsv', 70000000,        0, 14000000]);
let child2 = cp.fork('./write-review-file.js', ['out2.tsv', 70000000, 14000000, 14000000]);
let child3 = cp.fork('./write-review-file.js', ['out3.tsv', 70000000, 28000000, 14000000]);
let child4 = cp.fork('./write-review-file.js', ['out4.tsv', 70000000, 42000000, 14000000]);
let child5 = cp.fork('./write-review-file.js', ['out5.tsv', 70000000, 56000000, 14000000]);