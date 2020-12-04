import { parseFile } from '../util/fileParser';

const text = parseFile('day3.txt', __dirname);

const textByLine = text.split('\n');

console.log(
  `Parsed ${textByLine.length} numbers. O(n) = ${textByLine.length}, O(n^2) = ${
    textByLine.length * textByLine.length
  }, O(n^3) = ${textByLine.length * textByLine.length * textByLine.length}`,
);

const textMock = parseFile('day3.mock.txt', __dirname);
const textByLineMock = textMock.split('\n');

const treesEncounteredMock = goDownSlopes(textByLineMock, 3, 1);

console.log('Mock encounter', treesEncounteredMock);

const treesEncounteredChallenge = goDownSlopes(textByLine, 3, 1);

console.log('Challenge encounter', treesEncounteredChallenge);

const strat1 = goDownSlopes(textByLine, 1, 1);
const strat2 = goDownSlopes(textByLine, 3, 1);
const strat3 = goDownSlopes(textByLine, 5, 1);
const strat4 = goDownSlopes(textByLine, 7, 1);
const strat5 = goDownSlopes(textByLine, 1, 2);

const mulResult = strat1 * strat2 * strat3 * strat4 * strat5;

console.log('Total output', mulResult);

function goDownSlopes(slopes, right, down) {
  let treesEncountered = 0;
  let i = down;
  let currentSlope = right;
  const patternLength = slopes[0].length;
  while (i < slopes.length) {
    const currentPoint = slopes[i][currentSlope % patternLength];
    if (currentPoint === '#') {
      treesEncountered++;
    }
    currentSlope += right;
    i += down;
  }
  return treesEncountered;
}
