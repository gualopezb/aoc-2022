const fs = require('fs');
const input = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .filter(Boolean);

let data = [];
input.forEach(row => {
  const [left, right] = row.split(':');
  const [xsString, ysString] = left.split('Sensor at ')[1].split(', ');
  const [xs, ys] = [Number(xsString.split('x=')[1]), Number(ysString.split('y=')[1])];
  const [xbString, ybString] = right.split('closest beacon is at ')[1].split(', ');
  const [xb, yb] = [Number(xbString.split('x=')[1]), Number(ybString.split('y=')[1])];
  data.push({ s: { x: xs, y: ys }, b: { x: xb, y: yb } });
});

const sensorPoints = data.map(d => d.s);
const cacheSensorPoints = {};
const cacheCanNotBe = {};

for (let i = 0; i < sensorPoints.length; i++) {
  const element = sensorPoints[i];
  cacheSensorPoints[`${element.x},${element.y}`] = true;
}

const relevantNumber = 2000000;
let canNotBe = [];
data.forEach((row, index) => {
  const { x: xs, y: ys } = row.s;
  const { x: xb, y: yb } = row.b;

  let a = xb;
  let b = yb;
  while (a !== xs) {
    if (xb < xs) {
      a++;
    }
    else if (xb > xs) {
      a--;
    } else {
      a = xs;
    }

    if (yb > ys) {
      b++;
    }
    if (yb < ys) {
      b--;
    }
  }

  let startY;
  let endY;
  if (ys > b) {
    startY = b;
    endY = (2 * ys) - b;  
  } else {
    startY = (2 * ys) - b;
    endY = b;  
  }

  let startX = xs;
  let endX = xs;
  if (startY <= relevantNumber && endY >= relevantNumber) {
    for (let i = startY; i <= endY; i++) {
      if (i === relevantNumber) {
        for (let j = startX; j <= endX; j++) {
          if (!(xb === j && yb === i) && !cacheSensorPoints[`${j},${i}`] && !cacheCanNotBe[`${j},${i}`]) {
            cacheCanNotBe[`${j},${i}`] = true;
            canNotBe.push({ x: j, y: i });
          }
        }
      }
      if (i < ys) {
        startX--;
        endX++;
      } else {
        startX++;
        endX--;
      }
    }
  }
});

const result = canNotBe.filter(p => p.y === relevantNumber);
console.log(result.length);
