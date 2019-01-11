const cp = require('child_process');

let child1 = cp.fork('./write-review-file.js', ['out1.tsv', 70000000,        0, 10000000]);
let child2 = cp.fork('./write-review-file.js', ['out2.tsv', 70000000, 10000000, 10000000]);
let child3 = cp.fork('./write-review-file.js', ['out3.tsv', 70000000, 20000000, 10000000]);
let child4 = cp.fork('./write-review-file.js', ['out4.tsv', 70000000, 30000000, 10000000]);
let child5 = cp.fork('./write-review-file.js', ['out5.tsv', 70000000, 40000000, 10000000]);
let child6 = cp.fork('./write-review-file.js', ['out6.tsv', 70000000, 50000000, 10000000]);
let child7 = cp.fork('./write-review-file.js', ['out7.tsv', 70000000, 60000000, 10000000]);