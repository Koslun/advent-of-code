import * as _ from 'lodash';

import {
  countAnyYes,
  countEveryoneYes,
  textByLine,
  textByLineMock,
} from './day6';

describe('Day 6', () => {
  describe('Mock data', () => {
    it('should load data', () => {
      // total lines
      expect(textByLineMock.length).toEqual(5);
    });

    it('should total any answered counts', () => {
      const counts = textByLineMock.map(countAnyYes);

      const totalCount = _.sum(counts);

      expect(totalCount).toBe(11);
    });

    it('should total everyone answered counts', () => {
      const counts = textByLineMock.map(countEveryoneYes);

      const totalCount = _.sum(counts);

      expect(totalCount).toBe(6);
    });
  });

  describe('Challenge data', () => {
    it('should load data', () => {
      expect(textByLine.length).toEqual(465);
    });

    it('should total any answered counts', () => {
      const counts = textByLine.map(countAnyYes);

      const totalCount = _.sum(counts);

      expect(totalCount).toBe(6297);
    });

    it('should total everyone answered counts', () => {
      const counts = textByLine.map(countEveryoneYes);

      const totalCount = _.sum(counts);

      expect(totalCount).toBe(3158);
    });
  });
});
