import * as _ from 'lodash';

import {
  parseFixedProgram,
  parseProgram,
  textByLine,
  textByLineMock,
} from './day8';

describe('Day 8', () => {
  describe('Mock data', () => {
    it('should load data', () => {
      // total lines
      expect(textByLineMock.length).toEqual(9);
    });

    it('should count accumulated faulty program', () => {
      const counts = parseProgram(textByLineMock);

      expect(counts).toBe(5);
    });

    it('should count accumulated fixed program', () => {
      const counts = parseFixedProgram(textByLineMock);

      expect(counts).toBe(8);
    });
  });

  describe('Challenge data', () => {
    it('should load data', () => {
      expect(textByLine.length).toEqual(623);
    });

    it('should count accumulated faulty program', () => {
      const counts = parseProgram(textByLine);

      expect(counts).toBe(1394);
    });

    it('should count accumulated faulty program', () => {
      const counts = parseFixedProgram(textByLine);

      expect(counts).toBe(1626);
    });
  });
});
