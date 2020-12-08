import * as _ from 'lodash';

import {
  countOuterColors,
  countTotalBags,
  textByLine,
  textByLineMock,
  textByLineMock2,
} from './day7';

describe('Day 7', () => {
  describe('Mock data', () => {
    it('should load data', () => {
      // total lines
      expect(textByLineMock.length).toEqual(9);
    });

    it('should count by color', () => {
      const counts = countOuterColors('shinygold', textByLineMock);

      expect(counts).toBe(4);
    });

    it('should count total bags', () => {
      const counts = countTotalBags('shinygold', textByLineMock);

      expect(counts).toBe(32);
    });
  });

  describe('Challenge data', () => {
    it('should load data', () => {
      expect(textByLine.length).toEqual(594);
    });

    it('should count outer colors', () => {
      const counts = countOuterColors('shinygold', textByLine);

      expect(counts).toBe(248);
    });

    it('should count total bags', () => {
      const counts = countTotalBags('shinygold', textByLine);

      expect(counts).toBe(57281);
    });
  });

  describe('Mock data 2', () => {
    it('should load data', () => {
      // total lines
      expect(textByLineMock2.length).toEqual(7);
    });

    it('should count total bags', () => {
      const counts = countTotalBags('shinygold', textByLineMock2);

      expect(counts).toBe(126);
    });
  });
});
