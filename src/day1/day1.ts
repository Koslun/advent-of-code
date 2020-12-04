var fs = require('fs');

const text = fs.readFileSync('./2020_day1_input.txt', 'utf-8');

const textByLine = text.split('\n');

console.log(
  `Parsed ${textByLine.length} numbers. O(n) = ${textByLine.length}, O(n^2) = ${
    textByLine.length * textByLine.length
  }, O(n^3) = ${textByLine.length * textByLine.length * textByLine.length}`,
);

/**
 * Slightly better than straight O(n^2) by letting inner loop skip indices of previous iterations.
 */
function mvp() {
  let foundPair = false;
  let i = 0;
  let v0, v1;
  let totalIterations = 0;
  while (i < textByLine.length && !foundPair) {
    totalIterations++;
    // skip previously parsed values
    let j = i + 1;
    v0 = Number.parseInt(textByLine[i++]);
    if (!Number.isInteger(v0)) {
      continue;
    }
    while (j < textByLine.length && !foundPair) {
      totalIterations++;
      v1 = Number.parseInt(textByLine[j++]);
      if (!Number.isInteger(v1)) {
        continue;
      }
      if (v0 + v1 === 2020) {
        foundPair = true;
      }
    }
  }

  if (foundPair) {
    console.log(
      `Found a pair: (${v0}, ${v1}). Multiplied value: ${
        v0 * v1
      }. Iterations: ${totalIterations}.`,
    );
  } else {
    console.log(`Didn't find a pair using mvp solution.`);
  }
}

/**
 * Slightly better than straight O(n^3) by letting inner loop skip indices of previous iterations.
 */
function mvpThree() {
  let foundPair = false;
  let i = 0;
  let v0, v1, v2;
  let totalIterations = 0;
  while (i < textByLine.length && !foundPair) {
    totalIterations++;
    // skip previously parsed values
    let j = i + 1;
    v0 = Number.parseInt(textByLine[i++]);
    if (!Number.isInteger(v0)) {
      continue;
    }
    while (j < textByLine.length && !foundPair) {
      totalIterations++;
      let k = j + 1;
      v1 = Number.parseInt(textByLine[j++]);
      if (!Number.isInteger(v1)) {
        continue;
      }
      while (k < textByLine.length && !foundPair) {
        totalIterations++;
        v2 = Number.parseInt(textByLine[k++]);
        if (!Number.isInteger(v2)) {
          continue;
        }
        if (v0 + v1 + v2 === 2020) {
          foundPair = true;
        }
      }
    }
  }

  if (foundPair) {
    console.log(
      `Found a truple: (${v0}, ${v1}, ${v2}). Multiplied value: ${
        v0 * v1 * v2
      }. Iterations: ${totalIterations}.`,
    );
  } else {
    console.log(`Didn't find a truple using mvp solution.`);
  }
}

/**
 * Only finds solution if either number of pair is below cuttof.
 * With p=number below threshold, q=number above threshold we get O(n+p*q).
 * If p is small like with example data, it's quite a lot faster.
 * @param {} texyByLine
 */
function optimizedMvp(texyByLine, cuttof) {
  // const texyByLine = textByLineOriginal.slice(0);
  let foundPair = false;
  let i = 0;
  let v0, v1;
  let totalIterations = 0;
  const smallNumbers = [];
  texyByLine.forEach((value) => {
    totalIterations++;
    if (value < cuttof) {
      smallNumbers.push(value);
    }
  });

  while (i < smallNumbers.length && !foundPair) {
    totalIterations++;
    let j = 0;
    v0 = Number.parseInt(smallNumbers[i++]);
    if (!Number.isInteger(v0)) {
      continue;
    }
    while (j < textByLine.length && !foundPair) {
      totalIterations++;
      v1 = Number.parseInt(textByLine[j++]);
      if (!Number.isInteger(v1)) {
        continue;
      }
      if (v0 + v1 === 2020) {
        foundPair = true;
      }
    }
  }

  if (foundPair) {
    console.log(
      `Found a pair: (${v0}, ${v1}). Multiplied value: ${
        v0 * v1
      }. Iterations: ${totalIterations}.`,
    );
  } else {
    console.log(`Didn't find a pair using optimized solution.`);
  }
  return foundPair;
}

mvp();
mvpThree();
optimizedMvp(textByLine.slice(0), 1000);
