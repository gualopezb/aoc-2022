const fs = require('fs');
const input = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .filter(Boolean);

const relevantY = 2_000_000;

let canNotBe = new Set();
let known = new Set();
input.forEach(row => {
  const [left, right] = row.split(':');
  const [xsString, ysString] = left.split('Sensor at ')[1].split(', ');
  const [xs, ys] = [Number(xsString.split('x=')[1]), Number(ysString.split('y=')[1])];
  const [xbString, ybString] = right.split('closest beacon is at ')[1].split(', ');
  const [xb, yb] = [Number(xbString.split('x=')[1]), Number(ybString.split('y=')[1])];

  const distance = Math.abs(xs - xb) + Math.abs(ys - yb);
  const offset = distance - Math.abs(ys - relevantY);

  if (offset >= 0) {
    const lowX = xs - offset;
    const highX = xs + offset;

    for (let i = lowX; i <= highX; i++) {
      canNotBe.add(i);
    }

    if (yb === relevantY) {
      known.add(xb);
    }
  }
});

const result = [...canNotBe].filter(c => ![...known].find(k => k === c)).length;
console.log(result);
