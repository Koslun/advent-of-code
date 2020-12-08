import { parseFile } from '../util/fileParser';

const text = parseFile('day5.txt', __dirname);
const textMock = parseFile('day5.mock.txt', __dirname);

export const textByLine = text.split('\n');
export const textByLineMock = textMock.split('\n');

// console.log(
//   `Parsed ${textByLine.length} numbers. O(n) = ${textByLine.length}, O(n^2) = ${
//     textByLine.length * textByLine.length
//   }, O(n^3) = ${textByLine.length * textByLine.length * textByLine.length}`,
// );

export interface BoardingPass {
  row: number;
  column: number;
  seatId: number;
}

export function parseBoardingPass(unparsedBoardingPass: string): BoardingPass {
  let min = 0;
  let max = 127;

  let row;

  // F = lower half, B = upper half
  for (let i = 0; i < 7; i++) {
    const middlePoint = (max + min) / 2;
    if (unparsedBoardingPass[i] === 'F') {
      max = Math.floor(middlePoint);
    } else {
      min = Math.ceil(middlePoint);
    }
    if (min === max) {
      row = min;
    }
  }

  min = 0;
  max = 7;
  let column;
  // L = lower half, R = higher half
  for (let i = 7; i < 10; i++) {
    const middlePoint = (max + min) / 2;
    if (unparsedBoardingPass[i] === 'L') {
      max = Math.floor(middlePoint);
    } else {
      min = Math.ceil(middlePoint);
    }

    if (min === max) {
      column = min;
    }
  }

  return { row, column, seatId: row * 8 + column };
}

// TODO: move above logic to one function
// function findNode(min, max, string) {}

export function findMaxSeat(textLines: string[]) {
  const boardingPasses = textLines.map(parseBoardingPass);

  const boardingPassHighestSeat = boardingPasses.reduce(
    (prevB, currentBp, index, bps) => {
      if (prevB.seatId >= currentBp.seatId) return prevB;
      else return currentBp;
    },
  );

  return boardingPassHighestSeat;
}

export function findMinSeat(textLines: string[]) {
  const boardingPasses = textLines.map(parseBoardingPass);

  const boardingPassHighestSeat = boardingPasses.reduce(
    (prevB, currentBp, index, bps) => {
      if (prevB.seatId <= currentBp.seatId) return prevB;
      else return currentBp;
    },
  );

  return boardingPassHighestSeat;
}

/**
 * Assuming
 * @param textLines
 */
export function findMissingSeats(
  textLines: string[],
): { start: number; end: number }[] {
  const boardingPasses = textLines.map(parseBoardingPass);

  const sortedBoardingPasses = boardingPasses.sort(
    (b0, b1) => b0.seatId - b1.seatId,
  );
  const minBoardingPass = findMinSeat(textLines);
  // const maxBoardingPass = findMaxSeat(textLines);

  const missingPasses = [];
  let prevSeatId = minBoardingPass.seatId;
  for (let i = 1; i < sortedBoardingPasses.length; i++) {
    const currSeatId = sortedBoardingPasses[i].seatId;
    const seatIdDiff = currSeatId - prevSeatId;
    if (seatIdDiff > 1) {
      // const gapPasses = sortedBoardingPasses.slice(i - seatIdDiff - 1, i);
      missingPasses.push({
        start: currSeatId - seatIdDiff + 1,
        end: currSeatId,
      });
    }
    prevSeatId = sortedBoardingPasses[i].seatId;
  }

  // console.log('sortedBoardingPasses', sortedBoardingPasses.slice(665, 690));

  return missingPasses;
}
