import fs from 'fs';

const text = fs.readFileSync('./2020_day2_input.txt', 'utf-8');

const textByLine = text.split('\n');

console.log(
  `Parsed ${textByLine.length} numbers. O(n) = ${textByLine.length}, O(n^2) = ${
    textByLine.length * textByLine.length
  }, O(n^3) = ${textByLine.length * textByLine.length * textByLine.length}`,
);

const validPasswords = countValidPasswordList(textByLine);

console.log('Valid passwords: ' + validPasswords);

const validNewPasswords = countNewValidPasswordList(textByLine);

console.log('Valid with new password policy: ' + validNewPasswords);

function countValidPasswordList(textByLine) {
  let count = 0;
  textByLine.forEach((text) => {
    if (isValidPassword(text)) {
      count++;
    }
  });
  return count;
}

function isValidPassword(text) {
  const [interval, letterFluff, password] = text.split(' ');

  const [min, max] = interval.split('-');

  const keyLetter = letterFluff.substring(0, 1);

  let keyLetterCount = 0;
  for (let i = 0; i < password.length; i++) {
    if (password[i] === keyLetter) {
      keyLetterCount++;
    }
  }

  let minCount = Number.parseInt(min);
  let maxCount = Number.parseInt(max);

  return keyLetterCount >= minCount && keyLetterCount <= maxCount;
}

function countNewValidPasswordList(textByLine) {
  let count = 0;
  textByLine.forEach((text) => {
    if (isNewValidPassword(text)) {
      count++;
      // console.log("true");
    }
  });
  return count;
}

function isNewValidPassword(text) {
  const [interval, letterFluff, password] = text.split(' ');

  const [min, max] = interval.split('-');

  const keyLetter = letterFluff.substring(0, 1);

  let minCount = Number.parseInt(min);
  let maxCount = Number.parseInt(max);
  // console.log("keyLetter", keyLetter);
  // console.log("password", password);
  // // console.log("keyLetterCount", keyLetterCount);
  // console.log("minCount", minCount);
  // console.log("maxCount", maxCount);

  const firstLetter = password.charAt(minCount - 1);
  const secondLetter = password.charAt(maxCount - 1);

  const foundFirst = firstLetter === keyLetter;
  const foundSecond = secondLetter === keyLetter;
  // console.log("firstLetter", firstLetter);
  // console.log("secondLetter", secondLetter);

  return (foundFirst && !foundSecond) || (!foundFirst && foundSecond);
}
