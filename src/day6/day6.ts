import * as _ from 'lodash';

import { parseFile } from '../util/fileParser';

const text = parseFile('day6.txt', __dirname);
const textMock = parseFile('day6.mock.txt', __dirname);

export const textByLine = text.split('\n\n');
export const textByLineMock = textMock.split('\n\n');

// console.log(
//   `Parsed ${textByLine.length} numbers. O(n) = ${textByLine.length}, O(n^2) = ${
//     textByLine.length * textByLine.length
//   }, O(n^3) = ${textByLine.length * textByLine.length * textByLine.length}`,
// );

export function countAnyYes(groupedText: string) {
  const uniqChars: string[] = _.uniq(groupedText);

  const uniqCharsString = uniqChars.reduce((prev, curr) => prev + curr);
  const unescaptedUniqChars = uniqCharsString
    // remove line breaks
    .replace(/\r?\n|\r/g, '')
    // remove commas
    .replace(/,/g, '');

  // alternate approach with counting
  // const sortedChars = uniqChars.sort();
  // const count = _.countBy(unescaptedUniqChars, (charStr) =>
  //   _.includes(charStr, 'a'),
  // );
  return unescaptedUniqChars.length;
}

export function countEveryoneYes(groupedText: string) {
  const answersByPerson = groupedText.split('\n');

  const answersByPersonEscaped = answersByPerson.map((uniqCharsString) =>
    uniqCharsString
      // remove line breaks
      .replace(/\r?\n|\r/g, '')
      // remove commas
      .replace(/,/g, ''),
  );

  const sortedByYes: string[] = _.sortBy(
    answersByPersonEscaped,
    (personsAnswer) => personsAnswer.length,
  );

  const sortedByYesMost = sortedByYes.reverse();

  let totalCount = 0;
  for (let i = 0; i < sortedByYesMost[0].length; i++) {
    let yesCount = 0;
    for (let j = 0; j < sortedByYesMost.length; j++) {
      // console.log('this', sortedByYesMost[j]);
      // console.log('should include', sortedByYesMost[0][i]);
      if (sortedByYesMost[j].includes(sortedByYesMost[0][i])) {
        yesCount++;
      }
    }
    if (yesCount === sortedByYesMost.length) {
      // console.log('increment');
      totalCount++;
    }
  }

  // const uniqChars: string[] = _.uniq(groupedText);

  // const uniqCharsString = uniqChars.reduce((prev, curr) => prev + curr);
  // const unescaptedUniqChars = uniqCharsString
  //   // remove line breaks
  //   .replace(/\r?\n|\r/g, '')
  //   // remove commas
  //   .replace(/,/g, '');
  // // alternate approach with counting
  // // const sortedChars = uniqChars.sort();
  // // const count = _.countBy(unescaptedUniqChars, (charStr) =>
  // //   _.includes(charStr, 'a'),
  // // );
  return totalCount;
}
