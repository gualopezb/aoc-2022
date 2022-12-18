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

let canNotBe = [];
data.forEach((row, index) => {
  console.log('---sensor---', index + 1);
  const { x: xs, y: ys } = row.s;
  const { x: xb, y: yb } = row.b;
  // TODO remove
  // if (xs === 10 && ys === 20 && xb === 10 && yb === 16) {
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
    // console.log('ys ', ys);
    // console.log('startY ', startY);
    // console.log('endY ', endY);
    let startX = xs;
    let endX = xs;
    for (let i = startY; i <= endY; i++) {
      for (let j = startX; j <= endX; j++) {
        if (!(xb === j && yb === i) && !cacheSensorPoints[`${j},${i}`] && !cacheCanNotBe[`${j},${i}`]) {
          cacheCanNotBe[`${j},${i}`] = true;
          canNotBe.push({ x: j, y: i });
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
  // }
});

// console.log(data);
// console.log();
// console.log(canNotBe.length);

const result = canNotBe.filter(p => p.y === 2000000);
// console.log(result);
console.log(result.length);
