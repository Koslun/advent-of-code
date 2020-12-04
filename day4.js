var fs = require("fs");

const text = fs.readFileSync("./2020_day4_input.txt", "utf-8");
// const text = fs.readFileSync("./2020_day4_input.mock.txt", "utf-8");

const textByLine = text.split("\n\n");

console.log(
  `Parsed ${textByLine.length} numbers. O(n) = ${textByLine.length}, O(n^2) = ${
    textByLine.length * textByLine.length
  }, O(n^3) = ${textByLine.length * textByLine.length * textByLine.length}`
);

console.log("Number of passports: ", textByLine.length);

const passports = segmentPassports(textByLine);

const validList = passports.map(isValidPassport);

let validCount = 0;
validList.forEach((valid) => {
  if (valid) {
    validCount++;
  }
});

console.log("Valid passports", validCount);

function segmentPassports(unformattedPassports) {
  const passports = [];
  for (let i = 0; i < unformattedPassports.length; i++) {
    const squashedPassportList = unformattedPassports[i].split("\n");
    let squashedPassport = "";
    for (let j = 0; j < squashedPassportList.length; j++) {
      squashedPassport = squashedPassport.concat(squashedPassportList[j], " ");
    }
    passports.push(squashedPassport);
  }
  return passports;
}

function isValidPassport(passport) {
  // console.log("passport ", passport);
  const fields = passport.trim().split(" ");
  const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  const optionalFields = ["cid"];
  let noInvalidKey = true;
  let requiredFieldCount = 0;
  for (let i = 0; i < fields.length; i++) {
    const [key, value] = fields[i].split(":");
    // console.log("key", key);
    //  || optionalFields.includes(key)
    if (requiredFields.includes(key)) {
      let validKey = true;
      if ("byr" === key) {
        let numValue = Number.parseInt(value);
        validKey = numValue >= 1920 && numValue <= 2002;
      } else if ("iyr" === key) {
        let numValue = Number.parseInt(value);
        validKey = numValue >= 2010 && numValue <= 2020;
      } else if ("eyr" === key) {
        let numValue = Number.parseInt(value);
        validKey = numValue >= 2020 && numValue <= 2030;
      } else if ("hgt" === key) {
        let numStr = value.substring(0, value.length - 2);
        let numValue = Number.parseInt(numStr);
        if (value.endsWith("cm")) {
          validKey = numValue >= 150 && numValue <= 193;
        } else if (value.endsWith("in")) {
          validKey = numValue >= 59 && numValue <= 76;
        } else {
          validKey = false;
        }
      } else if ("hcl" === key) {
        const hexValue = Number.parseInt(value.substring(1, value.length), 16);
        validKey =
          value.length === 7 &&
          value.startsWith("#") &&
          !Number.isNaN(hexValue);
      } else if ("ecl" === key) {
        const eyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
        validKey = eyeColors.includes(value);
      } else if ("pid" === key) {
        const numValueStr = value.replace(/^(-)?0+(0\.|\d)/, "$1$2");
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
