const util = require('util')
const fs = require("fs");
const input = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .filter((s) => s !== "");

const grid = input.map(row => row.split('').map(Number));

let visibleCounter = 0;

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    const tree = grid[i][j];
    if (i === 0 || i === grid.length - 1 || j === 0 || j === grid[i].length - 1) {
      visibleCounter++;
    } else {
      let visible = true;
      // up
      for (let k = 0; k < i; k++) {
        if (grid[k][j] >= tree) {
          visible = false;
        }
      }

      if (visible) {
        visibleCounter++;
        continue;
      }

      visible = true;
      // down
      for (let k = i + 1; k < grid.length; k++) {
        if (grid[k][j] >= tree) {
          visible = false;
        }
      }

      if (visible) {
        visibleCounter++;
        continue;
      }

      visible = true;
      // left
      for (let l = 0; l < j; l++) {
        if (grid[i][l] >= tree) {
          visible = false;
        }
      }

      if (visible) {
        visibleCounter++;
        continue;
      }

      visible = true;
      // right
      for (let l = j + 1; l < grid[i].length; l++) {
        if (grid[i][l] >= tree) {
          visible = false;
        }
      }

      if (visible) {
        visibleCounter++;
        continue;
      }
    }
  }
}

console.log(visibleCounter);
