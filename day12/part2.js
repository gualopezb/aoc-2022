const fs = require('fs');
const input = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .filter(Boolean)
  .map(s => s.split('').map(st => st.charCodeAt(0)));

// 69 -> E
// 122 -> z
// 97 -> a
// 83 -> S

// convert `S`s to `a`s
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if (input[i][j] === 83) input[i][j] = 97;
  }
}

let startNodes = [];
let endNode;

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    const element = input[i][j];
    if (!startNodes.includes(`${i},${j}`) && element === 97) {
      startNodes.push(`${i},${j}`);
    }
    if (!endNode && element === 69) {
      endNode = `${i},${j}`;
    }
  }
}

let adjacencyList = {};
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    const isStartNode = input[i][j] === 97;
    const vertex = input[i][j];
    adjacencyList[`${i},${j}`] = [];

    if (i - 1 >= 0 && ((isStartNode && input[i - 1][j] === 97) || (input[i - 1][j] === 69 && input[i][j] === 122) || (input[i - 1][j] !== 69 && input[i - 1][j] - input[i][j] <= 1))) {
      adjacencyList[`${i},${j}`].push(`${i - 1},${j}`);
    }

    if (i + 1 < input.length && ((isStartNode && input[i + 1][j] === 97) || (input[i + 1][j] === 69 && input[i][j] === 122) || (input[i + 1][j] !== 69 && input[i + 1][j] - input[i][j] <= 1))) {
      adjacencyList[`${i},${j}`].push(`${i + 1},${j}`);
    }

    if (j - 1 >= 0 && ((isStartNode && input[i][j - 1] === 97) || (input[i][j - 1] === 69 && input[i][j] === 122) || (input[i][j - 1] !== 69 && input[i][j - 1] - input[i][j] <= 1))) {
      adjacencyList[`${i},${j}`].push(`${i},${j - 1}`);
    }

    if (j + 1 < input[i].length && ((isStartNode && input[i][j + 1] === 97) || (input[i][j + 1] === 69 && input[i][j] === 122) || (input[i][j + 1] !== 69 && input[i][j + 1] - input[i][j] <= 1))) {
      adjacencyList[`${i},${j}`].push(`${i},${j + 1}`);
    }
  }
}

const bfs = (graph, start, end) => {
	let queue = [[start, [start]]];
  let visited = new Set();

	while (queue.length > 0) {
    const [vertex, path] = queue.shift();
    visited.add(vertex);
    for (let i = 0; i < graph[vertex].length; i++) {
      const node = graph[vertex][i];
      if (node === end) {
        return path.concat(end);
      }

      if (!visited.has(node)) {
        visited.add(node);
        queue.push([node, path.concat(node)]);
      }
    }
	}
  console.log('not found');
};

const result = startNodes.map(sn => {
  const r = bfs(adjacencyList, sn, endNode);
  return r.length - 1;
}).filter(r => r > -1).sort((a, b) => a - b)[0];
console.log(result);
