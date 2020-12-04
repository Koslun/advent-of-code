import fs = require('fs');
import { join } from 'path';

export function parseFile(fileName, dirName) {
  const path = join(dirName, '/' + fileName);
  const text = fs.readFileSync(path, 'utf-8');
  return text;
}
