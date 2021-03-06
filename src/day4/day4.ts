import { parseFile } from '../util/fileParser';

const text = parseFile('day4.txt', __dirname);
const textMock = parseFile('day4.mock.txt', __dirname);

export const textByLine = text.split('\n\n');
export const textByLineMock = textMock.split('\n\n');

// console.log(
//   `Parsed ${textByLine.length} numbers. O(n) = ${textByLine.length}, O(n^2) = ${
//     textByLine.length * textByLine.length
//   }, O(n^3) = ${textByLine.length * textByLine.length * textByLine.length}`,
// );

export function segmentPassports(unformattedPassports) {
  const passports = [];
  for (let i = 0; i < unformattedPassports.length; i++) {
    const squashedPassportList = unformattedPassports[i].split('\n');
    let squashedPassport = '';
    for (let j = 0; j < squashedPassportList.length; j++) {
      squashedPassport = squashedPassport.concat(squashedPassportList[j], ' ');
    }
    passports.push(squashedPassport);
  }
  return passports;
}

export function isValidPassport(passport) {
  // console.log("passport ", passport);
  const fields = passport.trim().split(' ');
  const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  const optionalFields = ['cid'];
  let noInvalidKey = true;
  let requiredFieldCount = 0;
  for (let i = 0; i < fields.length; i++) {
    const [key, value] = fields[i].split(':');
    // console.log("key", key);
    //  || optionalFields.includes(key)
    if (requiredFields.includes(key)) {
      let validKey = true;
      let numValue;
      if ('byr' === key) {
        numValue = Number.parseInt(value);
        validKey = numValue >= 1920 && numValue <= 2002;
      } else if ('iyr' === key) {
        numValue = Number.parseInt(value);
        validKey = numValue >= 2010 && numValue <= 2020;
      } else if ('eyr' === key) {
        numValue = Number.parseInt(value);
        validKey = numValue >= 2020 && numValue <= 2030;
      } else if ('hgt' === key) {
        const numStr = value.substring(0, value.length - 2);
        numValue = Number.parseInt(numStr);
        if (value.endsWith('cm')) {
          validKey = numValue >= 150 && numValue <= 193;
        } else if (value.endsWith('in')) {
          validKey = numValue >= 59 && numValue <= 76;
        } else {
          validKey = false;
        }
      } else if ('hcl' === key) {
        const hexValue = Number.parseInt(value.substring(1, value.length), 16);
        validKey =
          value.length === 7 &&
          value.startsWith('#') &&
          !Number.isNaN(hexValue);
      } else if ('ecl' === key) {
        const eyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
        validKey = eyeColors.includes(value);
      } else if ('pid' === key) {
        const numValueStr = value.replace(/^(-)?0+(0\.|\d)/, '$1$2');
        const numValue = Number.parseInt(numValueStr);
        validKey = value.length === 9 && !Number.isNaN(numValue);
      }
      if (validKey) {
        requiredFieldCount++;
      } else {
        // console.log("invalid key", key);
        noInvalidKey = false;
      }
    } else if (!optionalFields.includes(key)) {
      noInvalidKey = false;
    }
  }
  // console.log("noInvalidKey", noInvalidKey);

  return noInvalidKey && requiredFieldCount === requiredFields.length;
}
