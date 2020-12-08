import * as _ from 'lodash';

import { parseFile } from '../util/fileParser';

const text = parseFile('day8.txt', __dirname);
const textMock = parseFile('day8.mock.txt', __dirname);
const textMock2 = parseFile('day8.2.mock.txt', __dirname);

export const textByLine = text.split('\n');
export const textByLineMock = textMock.split('\n');
export const textByLineMock2 = textMock2.split('\n');

export function parseProgram(inputText: string[]) {
  const executedCommands: Set<number> = new Set();
  const commands: string[][] = inputText.map((commandText) =>
    commandText.split(' '),
  );

  // const flippedNumbers: Set<number> = new Set();

  const { accumulator } = executeCommand(
    0,
    0,
    commands,
    executedCommands,
    // false,
    // undefined,
    // flippedNumbers,
  );

  return accumulator;
}

export function parseFixedProgram(inputText: string[]) {
  const commandsMaster: string[][] = inputText.map((commandText) =>
    commandText.split(' '),
  );

  let fixedAccumulator;

  // const flippedNumbers: Set<number> = new Set();

  for (let i = 0; i < commandsMaster.length; i++) {
    const commands = commandsMaster.slice();
    const operation = commands[i][0];
    if (operation === 'nop' || operation === 'jmp') {
      const executedCommands: Set<number> = new Set();

      let newOp;

      if (operation === 'nop') {
        newOp = 'jmp';
      } else {
        newOp = 'nop';
      }

      commands[i] = [newOp, commands[i][1]];

      const { accumulator, nextIndex } = executeCommand(
        0,
        0,
        commands,
        executedCommands,
        // true,
        // undefined,
        // flippedNumbers,
      );

      commands[i] = [operation, commands[i][1]];

      if (nextIndex === commands.length) {
        fixedAccumulator = accumulator;
      }
    }
  }

  return fixedAccumulator;
}

function executeCommand(
  i: number,
  accumulator: number,
  commands: string[][],
  executedCommands: Set<number>,
  fixMe = false,
  prevIndex = 0,
  // flippedNumbers: Set<number>,
  // flippedIndex: number,
): { accumulator: number; nextIndex: number } {
  if (i >= commands.length) {
    console.log('unexpected command index', i);
    return { accumulator, nextIndex: i };
  }
  const operation = commands[i][0];
  const argText = commands[i][1];

  // console.log(`${i}: ${operation} ${argText}`);

  // console.log('operation', operation);
  // console.log('argText', argText);

  if (executedCommands.has(i)) {
    // if (executedCommands.has(i) && !fixMe) {
    return { accumulator, nextIndex: i };
    // } else if (executedCommands.has(i) && fixMe) {
    //   console.log('op', operation);
    //   const availableIndices = Array.from(executedCommands);
    //   const triedIndices = Array.from(flippedNumbers);

    //   const indicesToTry = _.difference(availableIndices, triedIndices);

    //   const newIndexToFlip = indicesToTry[0];

    //   operation = commands[randomIndex][0];
    //   console.log('prev op', operation);
    //   if (operation === 'nop') {
    //     operation = 'jmp';
    //     // i = prevIndex;
    //   } else if (operation === 'jmp') {
    //     operation = 'nop';
    //     // i = prevIndex;
    //   } else {
    //     console.log(`unexpected faulty op ${operation}`, i);
    //     return accumulator;
    //   }
    //   console.log('index', i);
    //   console.log('prev index', prevIndex);
    //   console.log('new op', operation);
    //   console.log('commands pre assignment', commands);
    //   commands[prevIndex] = [operation, commands[prevIndex][1]];
    //   console.log('commands post assignment', commands);
    //   // commands[prevIndex][0] = operation;
    //   executedCommands.clear();
    //   // could actually restart from the previous command
    //   return executeCommand(
    //     0,
    //     0,
    //     commands,
    //     executedCommands,
    //     fixMe,
    //     undefined,
    //     flippedNumbers,
    //     flippedIndex
    //   );
  } else {
    executedCommands.add(i);
  }

  const { argOp, argNum } = parseArg(argText);

  if (operation === 'nop') {
    const newIndex = i + 1;
    return executeCommand(
      newIndex,
      accumulator,
      commands,
      executedCommands,
      fixMe,
      i,
      // flippedNumbers,
    );
  } else if (operation === 'acc') {
    const newIndex = i + 1;

    if (argOp === '+') {
      accumulator += argNum;
    } else if (argOp === '-') {
      accumulator -= argNum;
    } else {
      console.log('unexpected argOp for acc at index', i);
    }

    // console.log('acc', argNum);

    return executeCommand(
      newIndex,
      accumulator,
      commands,
      executedCommands,
      fixMe,
      i,
      // flippedNumbers,
    );
  } else if (operation === 'jmp') {
    let newIndex;

    if (argOp === '+') {
      newIndex = i + argNum;
    } else if (argOp === '-') {
      newIndex = i - argNum;
    } else {
      console.log('unexpected argOp for jmp at index', i);
    }

    return executeCommand(
      newIndex,
      accumulator,
      commands,
      executedCommands,
      fixMe,
      i,
      // flippedNumbers,
    );
  } else {
    console.log('unknown op at index', i);
    return { accumulator, nextIndex: i };
  }
}

function parseArg(argText: string) {
  const argOp = argText[0];

  const argNumStr = argText.substring(1);

  const argNum = Number.parseInt(argNumStr);

  return {
    argOp,
    argNum,
  };
}
