const util = require('util')
const fs = require("fs");
const [line1, line2, ...input] = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .filter((s) => s !== "");

let currentNavigation = [];
let tree = { files: [] };

for (let index = 0; index < input.length; index++) {
  const command = input[index]
  if (command === '$ ls') {}
  else if (command.startsWith('$ cd')) {
    if (command === '$ cd ..') {
      currentNavigation.pop();
    } else {
      const dirNameToCd = command.split('$ cd ')[1];
      currentNavigation.push(dirNameToCd);
    }
  }
  else if (command.startsWith('dir ')) {
    const dirName = command.split('dir ')[1];
    eval(`tree${currentNavigation.map(dir => `['${dir}']`).join('')}['${dirName}'] = { files: [] }`);
  }
  else {
    const [fileSize, fileName] = command.split(' ');
    eval(`if (!tree${currentNavigation.map(dir => `['${dir}']`).join('')}) tree${currentNavigation.map(dir => `['${dir}']`).join('')}.files = []`);
    eval(`tree${currentNavigation.map(dir => `['${dir}']`).join('')}.files.push({ fileName: '${fileName}', fileSize: ${fileSize} })`);
  }
}

// console.log(util.inspect(tree, { showHidden: false, depth: null, colors: true }));

const dirSizes = {};

const getDirSize = (parentKey, childKey, dir) => {
  if (!dir) return 0;
  const filesSize = dir.files.map(f => f.fileSize).reduce((acc, current) => acc + current, 0);
  const subDirsSize = Object.keys(dir).filter(dir2 => dir2 !== 'files').map(key => {
    const dirSize = getDirSize(childKey, key, dir[key]);
    dirSizes[`${childKey}_${key}`] = dirSize;
    return dirSize;
  }).reduce((acc, current) => acc + current, 0);

  const total = filesSize + subDirsSize;
  dirSizes[`${parentKey}_${childKey}`] = total;
  return total;
};

Object.keys(tree).filter(key => key !== 'files').map((key) => {
  return getDirSize('/', key, tree[key]);
});

const totalUsed = Object.keys(dirSizes).filter(ds => ds.startsWith('/_')).map(key => dirSizes[key]).reduce((acc, current) => acc + current, 0) + tree.files.reduce((acc, current) => acc + current.fileSize, 0);
const sortedSizes = Object.values(dirSizes).sort((a, b) => a - b);

let result = 0;
for (let index = 0; index < sortedSizes.length; index++) {
  const dirSize = sortedSizes[index];
  if (totalUsed - dirSize <= 40_000_000) {
    result = dirSize;
    break;
  }
}

console.log(result);
