import {
  findMaxSeat,
  findMinSeat,
  findMissingSeats,
  parseBoardingPass,
  textByLine,
  textByLineMock,
} from './day5';

describe('Day 5', () => {
  describe('Mock data', () => {
    it('should load data', () => {
      // total boarding passes
      expect(textByLineMock.length).toEqual(4);
    });

    it('should parse boarding passes', () => {
      const [b0, b1, b2, b3] = textByLineMock.map(parseBoardingPass);

      expectBoardingPass(b0, 70, 7, 567);
      expectBoardingPass(b1, 14, 7, 119);
      expectBoardingPass(b2, 102, 4, 820);
      expectBoardingPass(b3, 44, 5, 357);
    });

    it('should find highest seat', () => {
      const highestBoardingPass = findMaxSeat(textByLineMock);
      expect(highestBoardingPass.seatId).toEqual(820);
    });

    it('should find lowest seat', () => {
      const highestBoardingPass = findMinSeat(textByLineMock);
      expect(highestBoardingPass.seatId).toEqual(119);
    });
  });

  describe('Challenge data', () => {
    it('should load data', () => {
      // total boarding passes
      expect(textByLine.length).toEqual(933);
    });

    it('should find highest seat', () => {
      const highestBoardingPass = findMaxSeat(textByLine);
      expect(highestBoardingPass.seatId).toEqual(994);
    });

    it('should find lowest seat', () => {
      const highestBoardingPass = findMinSeat(textByLine);
      expect(highestBoardingPass.seatId).toEqual(61);
    });

    it('should find missing seats', () => {
      const missingBoardingPasses = findMissingSeats(textByLine);
      expect(missingBoardingPasses.length).toEqual(1);
      expect(missingBoardingPasses[0].start).toEqual(741);
      expect(missingBoardingPasses[0].end).toEqual(742);
      // meaning only 741 is empty
    });
  });
});

function expectBoardingPass(boardingPass, row, column, seatId) {
  expect(boardingPass.row).toBe(row);
  expect(boardingPass.column).toBe(column);
  expect(boardingPass.seatId).toBe(seatId);
}
