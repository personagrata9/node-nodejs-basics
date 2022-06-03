import * as path from 'path';
import * as url from 'url';
import { access, readFile } from 'fs/promises';

export const read = async () => {
  const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
  const folderName = 'files';
  const fileToReadName = 'fileToRead.txt';
  const fileToReadPath =  path.join(__dirname, folderName, fileToReadName);

  const errorMessage = 'FS operation failed';

  const checkIsFileExist = async (filePath) => {
    try {
      await access(filePath);
      return true;
    } catch {
      return false;
    }
  };

  try {
    const ifFileExist = await checkIsFileExist(fileToReadPath);

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