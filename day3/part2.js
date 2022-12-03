const fs = require("fs");
const input = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .filter((s) => s !== "");

const chunkSize = 3;

const groupedItems = input.reduce((chunkedArray, item, index) => {
  const chunkIndex = Math.floor(index / chunkSize);

  if(!chunkedArray[chunkIndex]) {
    chunkedArray[chunkIndex] = [];
  }

  chunkedArray[chunkIndex].push(item);
  return chunkedArray;
}, []);

const commonTypes = groupedItems.map(group => {
  const elvesItems = group.map(c => c.split(''));
  const [elf1, elf2, elf3] = elvesItems;
  const commonType = elf1.find(itemType => elf2.includes(itemType) && elf3.includes(itemType));
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
