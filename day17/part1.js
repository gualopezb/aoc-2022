const fs = require('fs');
const [input] = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .filter(Boolean);

// console.log(input.split(''));

const rocks = [
  [[1, 1, 1, 1]],
  [[0, 1, 0], [1, 1, 1,], [0, 1, 0]],
  [[0, 0, 1], [0, 0, 1], [1, 1, 1]],
  [[1], [1], [1], [1]],
  [[1, 1], [1, 1]]
];

let tallest = 0;
let x = 2;
let y = tallest + 3;
let currentShape = rocks[1];

const obj = {};

// rock initial position
for (let i = currentShape.length - 1; i >= 0; i--) {
  x = 2;
  for (let j = 0; j < currentShape[i].length; j++) {
    console.log(x, y, 'value: ', currentShape[i][j]);
    obj[`${x},${y}`] = currentShape[i][j];
    x++;
  }
  y++;
}

console.log('before', obj);

// rock movements
let cx = 2;
let cy = 3;
// can move to the left?
let canMove = true;
const limit = (cy + currentShape.length) - 1;
if (cx - 1 >= 0) {
  for (let i = cy; i <= limit; i++) {
    const element = obj[`${cx},${i}`];
    const previousElement = obj[`${cx - 1},${i}`];
    if (element === 1 && previousElement === -1) {
      console.log('cannot move');
      canMove = false;
      break;
    }
  }
} else {
  console.log('edge reached');
}

// move to left
for (let j = cx; j <= cx + currentShape[0].length - 1; j++) {
  for (let i = cy; i <= limit; i++) {
    const value = obj[`${j},${i}`];
    obj[`${j - 1},${i}`] = value;
    delete obj[`${j},${i}`];
  }
}
cx--;
console.log('after', obj);
