import * as path from 'path';
import { fileURLToPath } from 'url';
import { checkDirentExist } from './check-dirent-exist.mjs';
import { readFile } from 'fs/promises';

export const read = async () => {
  const __dirname = fileURLToPath(new URL('.', import.meta.url));
  const folderName = 'files';
  const fileToReadName = 'fileToRead.txt';
  const fileToReadPath =  path.join(__dirname, folderName, fileToReadName);

  const errorMessage = 'FS operation failed';

  try {
    const ifFileExist = await checkDirentExist(fileToReadPath);

    if (!ifFileExist) {
      throw new Error(errorMessage);
    } else {
      const content = await readFile(fileToReadPath, { encoding: 'utf-8' });
      console.log(content);
    }
  } catch (error) {
    console.error(error.message);
  }
};

read();