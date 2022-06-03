import * as path from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';

const { createHash } = await import('crypto');

const getDataFromFile = async (fileName) => {
  const __dirname = fileURLToPath(new URL('.', import.meta.url));
  const folderName = 'files';
  const filePath = path.join(__dirname, folderName, fileName);

  return await readFile(filePath, { encoding: 'utf-8' });
};

export const calculateHash = async () => {
  const fileName = 'fileToCalculateHashFor.txt';
  
  const sha256Hasher = createHash('sha256');
  const data = await getDataFromFile(fileName);
  const hash = sha256Hasher.update(data).digest('hex');

  console.log(`Hash for file ${fileName} is ${hash}`);
  return hash;
};

calculateHash();