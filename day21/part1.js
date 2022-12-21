const fs = require('fs');
const input = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .filter(Boolean);

let index = 0;
let evalsCount = 0;
let values = {};
while (Object.keys(values).length < input.length) {
  const expression = input[index];
  const [monkeyVar, monkeyYield] = expression.split(': ');
  if (!Number.isNaN(Number(monkeyYield))) {
    if (!values[monkeyVar]) {
      eval(`global.${monkeyVar} = Number(${monkeyYield});`);
      values[monkeyVar] = Number(monkeyYield);
      evalsCount++;
    } 
  } else {
    const monkeyYieldDeps = monkeyYield.split(' ');
    const operator = monkeyYieldDeps[1];
    const [monkeyYieldLeft, monkeyYieldRight] = [`global.${monkeyYieldDeps[0]}`, `global.${monkeyYieldDeps[2]}`];
    try {
      eval(`global.${monkeyVar} = ${monkeyYield}`);
      values[monkeyVar] = eval(`${monkeyYieldLeft} ${operator} ${monkeyYieldRight}`);
      evalsCount++;
    } catch (error) {}
  }
  index++;
  if (index >= input.length) {
    index = 0;
  }
}

console.log(values.root);
