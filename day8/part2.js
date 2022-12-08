const util = require('util')
const fs = require("fs");
const input = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .filter((s) => s !== "");

const grid = input.map(row => row.split('').map(Number));

let scenicScores = [];

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    const tree = grid[i][j];
    if (i === 0 || i === grid.length - 1 || j === 0 || j === grid[i].length - 1) {
      scenicScores.push(0);
    } else {
      let visibleUp = 0;
      // up
      for (let k = i - 1; k >= 0; k--) {
        if (grid[k][j] < tree) {
          visibleUp++;
        } else {
          visibleUp++;
          break;
        }
      }

      let visibleDown = 0;
      // down
      for (let k = i + 1; k < grid.length; k++) {
        if (grid[k][j] < tree) {
          visibleDown++;
        } else {
          visibleDown++;
          break;
        }
      }

      let visibleLeft = 0;
      // left
      for (let l = j - 1; l >= 0; l--) {
        if (grid[i][l] < tree) {
          visibleLeft++;
        } else {
          visibleLeft++;
          break;
        }
      }

      let visibleRight = 0;
      // right
      for (let l = j + 1; l < grid[i].length; l++) {
        if (grid[i][l] < tree) {
          visibleRight++;
        } else {
          visibleRight++;
          break;
        }
      }

      const currentScore = visibleUp * visibleDown * visibleLeft * visibleRight;
      scenicScores.push(currentScore);
    }
  }
}

const result = Math.max(...scenicScores);

console.log(result);
