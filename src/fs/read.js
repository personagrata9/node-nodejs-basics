import * as path from 'path';
import * as url from 'url';
import { readFile } from 'fs/promises';

export const read = async () => {
  const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
  const folderName = 'files';
  const fileToReadName = 'fileToRead.txt';
  const fileToReadPath =  path.join(__dirname, folderName, fileToReadName);

  const errorMessage = 'FS operation failed';

  await readFile(fileToReadPath, { encoding: 'utf-8' })
    .then((content) => console.log(content))
    .catch(() => {
      throw new Error(errorMessage);
    })
};

read();