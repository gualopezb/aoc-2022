const util = require('util')
const fs = require("fs");
const input = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .filter((s) => s !== "")
  .map(row => row.split(' '));

const tailSet = new Set();
tailSet.add('0,0');

let headX = 0;
let headY = 0;
let tailX = 0;
let tailY = 0;

const tryMoveTail = () => {
  const absX = Math.abs(headX - tailX);
  const absY = Math.abs(headY - tailY);
  const isTailAdjacent = absX <= 1 && absY <= 1;
  if (!isTailAdjacent) {
    // same row
    if (headY === tailY) {
      if (headX > tailX) {
        tailX++;
        tailSet.add(`${tailX},${tailY}`);
      } else {
        tailX--;
        tailSet.add(`${tailX},${tailY}`);
      }
    // same column
    } else if (headX === tailX) {
      if (headY > tailY) {
        tailY++;
        tailSet.add(`${tailX},${tailY}`);
      } else {
        tailY--;
        tailSet.add(`${tailX},${tailY}`);
      }
    // different row and column, then move diagonally
    } else {
      if (headX > tailX && headY > tailY) {
        tailX++;
        tailY++;
        tailSet.add(`${tailX},${tailY}`);
      } else if (headX > tailX && headY < tailY) {
        tailX++;
        tailY--;
        tailSet.add(`${tailX},${tailY}`);
      } else if (headX < tailX && headY < tailY) {
        tailX--;
        tailY--;
        tailSet.add(`${tailX},${tailY}`);
      } else if (headX < tailX && headY > tailY) {
        tailX--;
        tailY++;
        tailSet.add(`${tailX},${tailY}`);
      }
    }
  }
}

for (let i = 0; i < input.length; i++) {
  const [direction, positions] = [input[i][0], Number(input[i][1])];
  for (let j = 0; j < positions; j++) {
    if (direction === 'R') {
      headX++;
    } else if (direction === 'D') {
      headY--;
    } else if (direction === 'L') {
      headX--;
    } else if (direction === 'U') {
      headY++;
    }

    tryMoveTail();
  }
}

const result = tailSet.size;
console.log(result);
