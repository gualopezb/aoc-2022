const fs = require("fs");
const input = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .filter((s) => s !== "");
  
const data = input.filter(line => !line.startsWith('move'));
const instructions = input.filter(line => line.startsWith('move'));

const matrix = [];

data.forEach((row, index) => {
  if (index === data.length - 1) return;

  const stacksNumber = 9;
  let start = 0;
  let end = 3;
  for (let j = 0; j < stacksNumber; j++) {
    if (!matrix[j]) matrix[j] = [];

    const value = row.substring(start, end);
    if (value !== '   ') matrix[j].push(value);
    start +=4;
    end += 4;
  }
});

instructions.forEach(instruction => {
  const [amountToMoveString] = instruction.match(/(?<=move )(.*)(?= from )/g);
  const amountToMove = Number(amountToMoveString);

  const [fromStackString] = instruction.match(/(?<=from )(.*)(?= to )/g);
  const fromStack = Number(fromStackString);

  const [toStackString] = instruction.match(/(?<=to )(.*)/g);
  const toStack = Number(toStackString);

  const removedElements = matrix[fromStack - 1].splice(0, amountToMove);
  matrix[toStack - 1] = removedElements.concat(matrix[toStack - 1]);
});

const result = matrix.map(m => m[0]);

console.log(result);
