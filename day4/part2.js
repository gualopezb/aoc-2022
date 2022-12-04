const fs = require("fs");
const input = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .filter((s) => s !== "");

const data = input.map(pair => pair.split(',').map(elfAssignment => elfAssignment.split('-').map(Number)));

const assignmentsWithOverlap = data.filter(([[a, b], [c, d]]) => b >= c && d >= a);

const result = assignmentsWithOverlap.length;

console.log(result);
