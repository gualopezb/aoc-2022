const fs = require('fs');
const input = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .filter(Boolean)
  .map(s => s.split('').map(st => st.charCodeAt(0)));

let startNode;
let endNode;

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    const element = input[i][j];
    if (!startNode && element === 83) {
      startNode = `${i},${j}`;
    }
    if (!endNode && element === 69) {
      endNode = `${i},${j}`;
    }
    if (startNode && endNode) break;
  }
}

// 69 -> E
// 122 -> z
// 97 -> a

let adjacencyList = {};
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    const isStartNode = `${i},${j}` === startNode;
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

const result = bfs(adjacencyList, startNode, endNode).length - 1;
console.log(result);
