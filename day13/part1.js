const fs = require('fs');
const input = fs
  .readFileSync('input.txt', 'utf8')
  .split(/\r?\n/)
  .filter(Boolean);

const chunkSize = 2;

const pairs = input.reduce((chunkedArray, item, index) => {
  const chunkIndex = Math.floor(index / chunkSize);

  if(!chunkedArray[chunkIndex]) {
    chunkedArray[chunkIndex] = [];
  }

  chunkedArray[chunkIndex].push(eval(item));
  return chunkedArray;
}, []);

const compare = ([left, right]) => {
  if (typeof left === 'object' && typeof right === 'number') {
    return compare([left, [right]]);
  }

  if (typeof right === 'object' && typeof left === 'number') {
    return compare([[left], right]);
  }

  if (typeof left === 'number' && typeof right === 'number') {
    if (left > right) {
      return null;
    }
    else if (left < right) {
      return true;
    }
  }

  let isCorrectOrder = false;
  if (typeof left === 'object' && typeof right === 'object') {
    const iterations = Math.max(left.length, right.length);
    let i = 0;
    while (i < iterations && !isCorrectOrder) {
      const l = left[i];
      const r = right[i];

      if (l === undefined) {
        isCorrectOrder = true;
        break;
      }
      else if (r === undefined) {
        isCorrectOrder = null;
        break;
      }

      isCorrectOrder = compare([l, r]);
      if (isCorrectOrder === null) return null;
      i++;
    }
  }

  return isCorrectOrder;
};

const result = pairs.map(([left, right]) => compare([left, right])).reduce((acc, current, index) => current ? acc + index + 1 : acc, 0);
console.log(result);
