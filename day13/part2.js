const fs = require('fs');
const input = fs
  .readFileSync('input.txt', 'utf8')
  .split(/\r?\n/)
  .filter(Boolean)
  .map(row => eval(row));

const compare = ([left, right]) => {
  // console.log('left ', left, ' right ', right);
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

input.push([[2]], [[6]]);

input.sort((a, b) => {
  const r = compare([a, b]);
  if (r) {
    return -1;
  }
  else if (r === null) {
    return 1;
  } else {
    return 0;
  }
});

let d1;
let d2;
let i = 0;

while (!d1 || !d2) {
  const element = input[i];
  if (element.length === 1) {
    if (Array.isArray(element[0]) && element[0].length === 1 && element[0][0] === 2) {
      d1 = i + 1;
    }
    if (Array.isArray(element[0]) && element[0].length === 1 && element[0][0] === 6) {
      d2 = i + 1;
    }
  }
  i++;
}

const result = d1 * d2;
console.log(result);
