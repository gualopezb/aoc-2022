const fs = require("fs");
const input = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .filter((s) => s !== "");

const commonTypes = input.map(item => {
  const itemLength = item.length;
  const firstHalf = item.slice(0, itemLength / 2);
  const secondHalf = item.slice(itemLength / 2);

  const commonType = firstHalf.split('').find(itemType => secondHalf.includes(itemType));
  return commonType;
});

const lowerCaseAsciiOffset = 96;
const upperCaseAsciiOffset = 38;

const priorities = commonTypes.map((commonType) => {
  const isLowerCase = commonType === commonType.toLowerCase();
  const asciiOffset =
    commonType === commonType.toLowerCase() ? lowerCaseAsciiOffset : upperCaseAsciiOffset;
  return commonType.charCodeAt(0) - asciiOffset;
});

const result = priorities.reduce((acc, current) => acc + current, 0);

console.log(result);
