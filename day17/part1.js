const fs = require('fs');
const [jetPatterns] = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .filter(Boolean)
  .map(s => s.split(''));

const rocks = [
  [[1, 1, 1, 1]],
  [[0, 1, 0], [1, 1, 1,], [0, 1, 0]],
  [[0, 0, 1], [0, 0, 1], [1, 1, 1]],
  [[1], [1], [1], [1]],
  [[1, 1], [1, 1]]
];

let tallest = 0;
let rocksCounter = 0;
let jetPatternsCounter = 0;
let grid = {};

for (let currentRock = 0; currentRock < 2022; currentRock++) {
  let allMovementsCounter = 0;
  const rock = rocks[rocksCounter % rocks.length];

  let rockDidComeToRest = false;

  let gr = tallest + 3;

  // initial position of the rock in the grid
  for (let i = rock.length - 1; i >= 0; i--) {
    let gc = 2;
    for (let j = 0; j < rock[i].length; j++) {
      if (rock[i][j]) {
        grid[`${gr},${gc}`] = 1;
      }
      gc++;
    }
    gr++;
  }

  while (!rockDidComeToRest) {
    let keysOccupiedByCurrentRock = Object.keys(grid).filter(key => grid[key] === 1);
    const currentRockKeys = Object.keys(grid).filter(key => grid[key] === 1);
    const currentRockKeyRows = currentRockKeys.map(key => key.split(',')[0]);
    const currentRockKeyCols = currentRockKeys.map(key => key.split(',')[1]);
    const minRow = Math.min(...currentRockKeyRows);
    const maxRow = Math.max(...currentRockKeyRows);
    const minCol = Math.min(...currentRockKeyCols);
    const maxCol = Math.max(...currentRockKeyCols);

    if (allMovementsCounter % 2 === 0) {
      const jetPattern = jetPatterns[jetPatternsCounter % jetPatterns.length];

      if (jetPattern === '>') {
        let canNotMoveRight = false;
        for (let r = minRow; r <= maxRow; r++) {
          for (let c = minCol; c <= maxCol; c++) {
            if (c === 6 || grid[`${r},${c}`] === 1 && grid[`${r},${c + 1}`] === true) {
              canNotMoveRight = true;
            }
          }
        }
        if (!canNotMoveRight) {
          for (const keyOccupiedByCurrentRock of keysOccupiedByCurrentRock) {
            delete grid[keyOccupiedByCurrentRock];
          }

          for (const keyOccupiedByCurrentRock of keysOccupiedByCurrentRock) {
            const [row, col] = keyOccupiedByCurrentRock.split(',');
            const rowN = Number(row);
            const colN = Number(col);
            grid[`${rowN},${colN + 1}`] = 1;
          }
        }
      } else {
        let canNotMoveLeft = false;
        for (let r = minRow; r <= maxRow; r++) {
          for (let c = minCol; c <= maxCol; c++) {
            if (c === 0 || grid[`${r},${c}`] === 1 && grid[`${r},${c - 1}`] === true) {
              canNotMoveLeft = true;
            }
          }
        }
        if (!canNotMoveLeft) {
          for (const keyOccupiedByCurrentRock of keysOccupiedByCurrentRock) {
            delete grid[keyOccupiedByCurrentRock];
          }

          for (const keyOccupiedByCurrentRock of keysOccupiedByCurrentRock) {
            const [row, col] = keyOccupiedByCurrentRock.split(',').map(Number);
            grid[`${row},${col - 1}`] = 1;
          }
        }
      }
      jetPatternsCounter++;
    } else {
      let canNotMoveDown = false;
      for (let r = minRow; r <= maxRow; r++) {
        for (let c = minCol; c <= maxCol; c++) {
          if (r === 0 || grid[`${r},${c}`] === 1 && grid[`${r - 1},${c}`] === true) {
            canNotMoveDown = true;
          }
        }
      }

      if (canNotMoveDown) rockDidComeToRest = true;

      if (!rockDidComeToRest) {
        for (const keyOccupiedByCurrentRock of keysOccupiedByCurrentRock) {
          delete grid[keyOccupiedByCurrentRock];
        }

        for (const keyOccupiedByCurrentRock of keysOccupiedByCurrentRock) {
          const [row, col] = keyOccupiedByCurrentRock.split(',').map(Number);
          grid[`${row - 1},${col}`] = 1;
        }
      }
    }
    allMovementsCounter++;
  }

  // make current rock as permanent
  const keysOccupiedByCurrentRock = Object.keys(grid).filter(key => grid[key] === 1);
  for (const keyOccupiedByCurrentRock of keysOccupiedByCurrentRock) {
    grid[keyOccupiedByCurrentRock] = true;
  }

  rocksCounter++;

  // set new tallest
  tallest = Math.max(...Object.keys(grid).map(key => Number(key.split(',')[0]))) + 1;
}

console.log('tallest', tallest);
