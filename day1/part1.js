const fs = require('fs');
const input = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .map(Number);

input.pop();

let caloriesAcc = 0;
const calories = input.reduce((acc, current) => {
  if (current === 0) {
    const elfCalories = caloriesAcc;
    caloriesAcc = 0;
    return acc.concat(elfCalories);
  } else {
    caloriesAcc += current;
    return acc;
  }
}, []);

const sortedCalories = calories.sort((a, b) => b - a);
const result = sortedCalories[0];

console.log(result);
