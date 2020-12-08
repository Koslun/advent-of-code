import * as _ from 'lodash';

import { parseFile } from '../util/fileParser';

const text = parseFile('day7.txt', __dirname);
const textMock = parseFile('day7.mock.txt', __dirname);
const textMock2 = parseFile('day7.2.mock.txt', __dirname);

export const textByLine = text.split('\n');
export const textByLineMock = textMock.split('\n');
export const textByLineMock2 = textMock2.split('\n');

export function countOuterColors(color: string, inputText: string[]) {
  const wordMatrix: string[][] = inputText.map((colorReqLine) =>
    _.words(colorReqLine),
  );

  const colorsCollected = [];

  const totalCount = countOuterBags(color, wordMatrix, colorsCollected);

  // console.log('colorsCollected', colorsCollected);
  // console.log('totalCount', totalCount);
  return totalCount;
}

function countOuterBags(
  color: string,
  wordMatrix: string[][],
  colorsCollected: string[],
) {
  const counts = [];
  colorsCollected.push(color);
  for (let i = 0; i < wordMatrix.length; i++) {
    const [c0, c1, __bags, __contain, numOrNo] = wordMatrix[i];
    // if (c0 === color[0] && c1 === color[1]) {

    // }
    const outerBag = c0 + c1;
    if (numOrNo === 'no') {
      // counts.push(0);
    } else {
      for (let j = 4; j < wordMatrix[i].length; j = j + 4) {
        const numStr = wordMatrix[i][j];
        const num = Number.parseInt(numStr);

        const reqColor = wordMatrix[i][j + 1] + wordMatrix[i][j + 2];

        if (reqColor === color && !_.includes(colorsCollected, outerBag)) {
          // TODO: multiply with num in next one
          const count =
            1 + countOuterBags(outerBag, wordMatrix, colorsCollected);

          counts.push(count);
        }
      }
    }
  }

  const totalCount = _.sum(counts);

  return totalCount;
}

export function countTotalBags(color: string, inputText: string[]) {
  const wordMatrix: string[][] = inputText.map((colorReqLine) =>
    _.words(colorReqLine),
  );

  const totalCount = countInnerBags(color, wordMatrix);

  // console.log('colorsCollected', colorsCollected);
  // console.log('totalCount', totalCount);
  return totalCount;
}

function countInnerBags(color: string, wordMatrix: string[][]) {
  const counts = [0];
  for (let i = 0; i < wordMatrix.length; i++) {
    const [c0, c1, __bags, __contain, numOrNo] = wordMatrix[i];
    // if (c0 === color[0] && c1 === color[1]) {

    // }
    const outerBag = c0 + c1;
    if (outerBag === color) {
      if (numOrNo === 'no') {
        counts.push(0);
      } else {
        for (let j = 4; j < wordMatrix[i].length; j = j + 4) {
          const numStr = wordMatrix[i][j];
          const num = Number.parseInt(numStr);

          // console.log('num', num);
          // console.log('numStr', numStr);

          const reqColor = wordMatrix[i][j + 1] + wordMatrix[i][j + 2];

          // console.log(`${outerBag} requires ${num} ${reqColor}`);
          // console.log('reqColor', reqColor);
          //  && !_.includes(colorsCollected, reqColor)
          // if (outerBag === color) {

          // }

          const count = num + num * countInnerBags(reqColor, wordMatrix);

          // console.log(
          //   `${outerBag} requires ${num} ${reqColor}, yields count ${count}`,
          // );
          // console.log('color - count', reqColor, count);
          // console.log('reeq', count);

          counts.push(count);
        }
      }
    }
  }

  const totalCount = _.sum(counts);

  return totalCount;
}
