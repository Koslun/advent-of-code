import {
  isValidPassport,
  segmentPassports,
  textByLine,
  textByLineMock,
} from './day4';

describe('Day 4', () => {
  // beforeEach(async () => {
  // });

  describe('Mock data', () => {
    it('should load data', () => {
      // total passports
      expect(textByLineMock.length).toEqual(8);
    });

    it('should validate passports', () => {
      const passports = segmentPassports(textByLineMock);

      const validList = passports.map(isValidPassport);

      let validCount = 0;
      validList.forEach((valid) => {
        if (valid) {
          validCount++;
        }
      });

      // valid passports
      expect(validCount).toBe(4);
    });
  });

  describe('Challenge data', () => {
    it('should load data', () => {
      // total passports
      expect(textByLine.length).toEqual(279);
    });

    it('should validate passports', () => {
      const passports = segmentPassports(textByLine);

      const validList = passports.map(isValidPassport);

      let validCount = 0;
      validList.forEach((valid) => {
        if (valid) {
          validCount++;
        }
      });

      // valid passports
      expect(validCount).toBe(147);
    });
  });
});
