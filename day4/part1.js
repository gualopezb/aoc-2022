const fs = require("fs");
const input = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .filter((s) => s !== "");

const data = input.map(pair => pair.split(',').map(elfAssignment => elfAssignment.split('-').map(Number)));

const assignmentsFullyContained = data.filter(([[a, b], [c, d]]) => (a <= c && b >= d) || (a >= c && b <= d));

const result = assignmentsFullyContained.length;

console.log(result);
