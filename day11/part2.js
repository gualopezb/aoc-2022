const fs = require('fs');
const input = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .filter(Boolean);

const chunkSize = 6;

const monkeys = input.reduce((chunkedArray, item, index) => {
  const chunkIndex = Math.floor(index / chunkSize);

  if(!chunkedArray[chunkIndex]) {
    chunkedArray[chunkIndex] = [];
  }

  chunkedArray[chunkIndex].push(item);
  return chunkedArray;
}, []);

const parsedMonkeys = monkeys.map((monkeyLines, index) => {
  return monkeyLines.reduce((acc, current, index) => {
    switch (index) {
      case 0:
        const monkeyNumberString = current.charAt(current.length - 2);
        const monkeyNumber = Number(monkeyNumberString);
        acc.id = monkeyNumber;
        return acc;   

      case 1:
        const [_0, startingItemsString] = current.split('  Starting items: ');
        acc.items = startingItemsString.split(', ').map(Number);
        return acc;   

      case 2:
        const [_1, operationString] = current.split('  Operation: new = ');
        acc.operation = eval(`(old) => ${operationString}`);
        return acc;

      case 3:
        const [_2, divisibleByString] = current.split('  Test: divisible by ');
        acc.test = Number(divisibleByString);

      case 4:
        const targetMonkeyTrueString = Number(current.charAt(current.length - 1));
        acc.testTrue = targetMonkeyTrueString;

      case 5:
        const targetMonkeyFalseString = Number(current.charAt(current.length - 1));
        acc.testFalse = targetMonkeyFalseString;
    
      default:
        return acc;
    }
  }, {});
});

const rounds = 20;

let inspectedItemsCounters = parsedMonkeys.reduce((acc, current, index) => {
  acc[index] = 0;
  return acc;
}, {});

for (let round = 1; round <= rounds; round++) {
  for (let i = 0; i < parsedMonkeys.length; i++) {
    const monkey = parsedMonkeys[i];
    const monkeyItemsLength = monkey.items.length;
    for (let j = 0; j < monkeyItemsLength; j++) {
      const item = monkey.items[0];
      inspectedItemsCounters[i]++;
      const worryLevel = monkey.operation(item);
      const newWorryLevel = Math.floor(worryLevel / 3);
      const targetMonkey = newWorryLevel % monkey.test === 0 ? monkey.testTrue : monkey.testFalse;
      monkey.items.shift();
      parsedMonkeys[targetMonkey].items.push(newWorryLevel);
    }
  }
  if ([1, 20, 1000, 2000].includes(round)) {
    console.log(inspectedItemsCounters);
  }
}

// const [activeMonkey1, activeMonkey2, activeMonkey3, activeMonkey4] = Object.values(inspectedItemsCounters).sort((a, b) => b - a);

// console.log(activeMonkey1, activeMonkey2, activeMonkey3, activeMonkey4);

// const result = activeMonkey1 * activeMonkey2;
// console.log(result);
