const fs = require("fs");
const input = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .filter((s) => s !== "")
  .map(row => row.split(' '));

const shapeNameByCharacterMapping = {
  A: 'Rock',
  B: 'Paper',
  C: 'Scissors',
  X: 'Rock',
  Y: 'Paper',
  Z: 'Scissors'
};

const scoreByShapeMapping = {
  Rock: 1,
  Paper: 2,
  Scissors: 3,
};

const calculateScore = (charPlayer1, charPlayer2) => {
  const shapePlayer1 = shapeNameByCharacterMapping[charPlayer1];
  const shapePlayer2 = shapeNameByCharacterMapping[charPlayer2];

  const scoreByShapePlayer1 = scoreByShapeMapping[shapePlayer1];
  const scoreByShapePlayer2 = scoreByShapeMapping[shapePlayer2];
  let scoreOutcomePlayer1 = 0;
  let scoreOutcomePlayer2 = 0;

  if (shapePlayer1 === shapePlayer2) {
    scoreOutcomePlayer1 = 3;
    scoreOutcomePlayer2 = 3;
  }

  // when player 1 is the winner
  else if ((shapePlayer1 === 'Rock' && shapePlayer2 === 'Scissors') ||
      (shapePlayer1 === 'Scissors' && shapePlayer2 === 'Paper') ||
      (shapePlayer1 === 'Paper' && shapePlayer2 === 'Rock')) {
    scoreOutcomePlayer1 = 6;
    scoreOutcomePlayer2 = 0;
  } else { // when player 2 is the winner
    scoreOutcomePlayer1 = 0;
    scoreOutcomePlayer2 = 6;
  }

  return {
    player1: scoreByShapePlayer1 + scoreOutcomePlayer1,
    player2: scoreByShapePlayer2 + scoreOutcomePlayer2,
  };
};

const result = input.map(([charPlayer1, charPlayer2]) => {
  const scores = calculateScore(charPlayer1, charPlayer2);
  return scores.player2;
}).reduce((acc, current) => acc + current, 0);

console.log(result);
