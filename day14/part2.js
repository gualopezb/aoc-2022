const fs = require('fs');
const input = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .filter(Boolean)
  .map(e => e.split(' -> ').map(e => {
    const [x, y] = e.split(',');
    return { x: Number(x), y: Number(y) };
  }));

const sandStartPoint = { x: 500, y: 0 };

let rockPaths = {};

input.forEach((path, index) => {
  rockPaths[index] = [];

  let start = path[0];
  for (let i = 01; i < path.length; i++) {
    const end = path[i];

    if (start.x === end.x) {
      const [s, e] = start.y < end.y ? [start.y, end.y] : [end.y, start.y];
      for (let a = s; a <= e; a++) {
        if (!rockPaths[index].find(n => n.y === a && n.x === start.x)) {
          rockPaths[index].push({ x: start.x, y: a });
        }
      }
    } else {
      const [s, e] = start.x < end.x ? [start.x, end.x] : [end.x, start.x];
      for (let b = s; b <= e; b++) {
        if (!rockPaths[index].find(n => n.x === b && n.y === start.y)) {
          rockPaths[index].push({ x: b, y: start.y });
        }
      }
    }

    start = path[i];
  }
});

let sandPoints = [];

const rockPointsFlattened = Object.values(rockPaths).flat(1);
const maxRockY = Math.max(...rockPointsFlattened.map(p => p.y)) + 2;
let reachedEnd = false;
while (!reachedEnd) {
  let x = 500;
  const countBefore = sandPoints.length;
  for (let y = 0; y < maxRockY; y++) {
    if (
      (rockPointsFlattened.find(p => p.x === x && p.y === y + 1) || sandPoints.find(p => p.x === x && p.y === y + 1)) &&
      (rockPointsFlattened.find(p => p.x === x - 1 && p.y === y + 1) || sandPoints.find(p => p.x === x - 1 && p.y === y + 1)) &&
      (rockPointsFlattened.find(p => p.x === x + 1 && p.y === y + 1) || sandPoints.find(p => p.x === x + 1 && p.y === y + 1)) &&
      x === 500 && y === 0
    ) {
      sandPoints.push({ x, y });
      reachedEnd = true;
      break;
    }
    else if (y === maxRockY - 1) {
      sandPoints.push({ x, y });
    } else {
      if (rockPointsFlattened.find(p => p.x === x && p.y === y + 1) || sandPoints.find(p => p.x === x && p.y === y + 1)) {
        if (rockPointsFlattened.find(p => p.x === x - 1 && p.y === y + 1) || sandPoints.find(p => p.x === x - 1 && p.y === y + 1)) {
          if (rockPointsFlattened.find(p => p.x === x + 1 && p.y === y + 1) || sandPoints.find(p => p.x === x + 1 && p.y === y + 1)) {
            sandPoints.push({ x, y });
            break;
          } else {
            x++;
          }
        } else {
          x--;
        }
      }
    }
  }
  const countAfter = sandPoints.length;
  if (countBefore === countAfter) reachedEnd = true;
}
console.log('result ', sandPoints.length);
