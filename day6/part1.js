const fs = require("fs");
const [input] = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .filter((s) => s !== "");

const areAllCharsDifferent = (word) => {
  const storedChars = [];
  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    if (storedChars.includes(char)) return false;
    storedChars.push(char);
  }
  return true;
};

let start = 0;
let end = 4;
let result = 0;
for (let index = 0; index < input.length; index++) {
  const sequence = input.substring(start, end);
  if (areAllCharsDifferent(sequence)) {
    result = end;
    break;
  }
  start++;
  end++;
}

console.log(result);
