const util = require('util')
const fs = require("fs");
const input = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .filter((s) => s !== "")
  .map(row => row.split(' '));

const relevantCycles = [20, 60, 100, 140, 180, 220];
let signalStrengths = [];

let register = 1;
let currentCycle = 0;

const checkCycle = () => {
  if (relevantCycles.includes(currentCycle)) {
    signalStrengths.push(currentCycle * register);
  }
};

for (let index = 0; index < input.length; index++) {
  const instruction = input[index];
  if (instruction.length === 1) {
    currentCycle++;
    checkCycle();
  } else {
    currentCycle++;
    checkCycle();
    currentCycle++;
    checkCycle();
    const num = Number(instruction[1]);
    register += num;
  }
}

const result = signalStrengths.reduce((acc, current) => acc + current, 0);
console.log(result);
