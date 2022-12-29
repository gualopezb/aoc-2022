const fs = require('fs');
const input = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .filter(Boolean);

const rowsTotal = 4_000_000;
let allRanges = [];

for (let index = 0; index <= rowsTotal; index++) {
  const relevantY = index;
  
  let ranges = [];
  input.forEach(row => {
    const [left, right] = row.split(':');
    const [xsString, ysString] = left.split('Sensor at ')[1].split(', ');
    const [xs, ys] = [Number(xsString.split('x=')[1]), Number(ysString.split('y=')[1])];
    const [xbString, ybString] = right.split('closest beacon is at ')[1].split(', ');
    const [xb, yb] = [Number(xbString.split('x=')[1]), Number(ybString.split('y=')[1])];

    const distance = Math.abs(xs - xb) + Math.abs(ys - yb);
    const offset = distance - Math.abs(ys - relevantY);

    if (offset >= 0) {
      const minX = xs - offset;
      const maxX = xs + offset;

      ranges.push([minX, maxX]);
    }
  });

  ranges.sort(([x1, y1], [x2, y2]) => {
    if (x1 === x2) {
      return y1 < y2 ? -1 : 1;
    }
    return x1 < x2 ? -1 : 1;
  });

  let q = [ranges[0]];
  for (let i = 0; i < ranges.length; i++) {
    const [minX, maxX] = ranges[i];

    const [qMin, qMax] = q[q.length - 1];
    if (minX > qMax + 1) {
      q.push([minX, maxX]);
      continue;
    }

    q[q.length - 1][1] = Math.max(qMax, maxX);
  }
  allRanges.push(q);
}

let result;
for (let i = 0; i < allRanges.length; i++) {
  if (allRanges[i].length === 2) {
    const [[_, endX]] = allRanges[i];
    result = ((endX + 1) * 4_000_000) + i;
    break;
  }
}
console.log(result);
