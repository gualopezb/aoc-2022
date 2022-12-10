const util = require('util')
const fs = require("fs");
const input = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .filter((s) => s !== "")
  .map(row => row.split(' '));

let register = 1;
let currentCycle = 0;

let grid = [];
for (let i = 0; i < 6; i++) {
  grid[i] = [];
  for (let j = 0; j < 40; j++) {
    grid[i][j] = '#';
  }
}

const checkCycle = () => {
  const x = Math.floor(currentCycle / 40);
  const y = (currentCycle % 40);
  const pixel = register === y + 1 || register === y || register === y - 1 ? '#' : ' ';
  grid[x][y] = pixel;
};

for (let index = 0; index < input.length; index++) {
  const instruction = input[index];
  if (currentCycle >= 239) break;
  if (instruction.length === 1) {
    currentCycle++;
    checkCycle();
  } else {
    currentCycle++;
    checkCycle();
    currentCycle++;
    const num = Number(instruction[1]);
    register += num;
    checkCycle();
  }
}

console.log(grid.map(row => row.join('')));
