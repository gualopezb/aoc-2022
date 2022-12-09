const util = require('util')
const fs = require("fs");
const input = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .filter((s) => s !== "")
  .map(row => row.split(' '));

const makeMove = (head, tail, direction) => {
  if (head.index === 0) {
    if (direction === 'R') {
      head.x++;
    } else if (direction === 'D') {
      head.y--;
    } else if (direction === 'L') {
      head.x--;
    } else if (direction === 'U') {
      head.y++;
    }
  }
  head.set.add(`${head.x},${head.y}`);

  const absX = Math.abs(head.x - tail.x);
  const absY = Math.abs(head.y - tail.y);
  const isTailAdjacent = absX <= 1 && absY <= 1;
  if (!isTailAdjacent) {
    // same row
    if (head.y === tail.y) {
      if (head.x > tail.x) {
        tail.x++;
      } else {
        tail.x--;
      }
    // same column
    } else if (head.x === tail.x) {
      if (head.y > tail.y) {
        tail.y++;
      } else {
        tail.y--;
      }
    // different row and column, then move diagonally
    } else {
      if (head.x > tail.x && head.y > tail.y) {
        tail.x++;
        tail.y++;
      } else if (head.x > tail.x && head.y < tail.y) {
        tail.x++;
        tail.y--;
      } else if (head.x < tail.x && head.y < tail.y) {
        tail.x--;
        tail.y--;
      } else if (head.x < tail.x && head.y > tail.y) {
        tail.x--;
        tail.y++;
      }
    }
    tail.set.add(`${tail.x},${tail.y}`);
  }
}

const knots = [];
const knotsToCreate = 10;
for (let i = 0; i < knotsToCreate; i++) {
  const newKnot = { x: 0, y: 0, set: new Set(), index: i };
  newKnot.set.add('0,0');
  knots.push(newKnot);
}

for (let i = 0; i < input.length; i++) {
  const [direction, positions] = [input[i][0], Number(input[i][1])];

  for (let j = 0; j < positions; j++) {
    for (let a = 0; a < knots.length - 1; a++) {
      const head = knots[a];
      const tail = knots[a + 1];

      makeMove(head, tail, direction);
    }
  }
}

const result = knots[knots.length - 1].set.size;
console.log(result);
