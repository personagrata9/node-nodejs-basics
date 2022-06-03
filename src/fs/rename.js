import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs/promises';

export const rename = async () => {
  const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
  const folderName = 'files';
  const wrongFileName = 'wrongFilename.txt';
  const properFileName = 'properFilename.md';

  const oldPath = path.join(__dirname, folderName, wrongFileName);
  const newPath = path.join(__dirname, folderName, properFileName);

  const successMessage = `File ${wrongFileName} was successfully renamed to ${properFileName}!`;
  const errorMessage = 'FS operation failed';

  const checkIsFileExist = async (filePath) => {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  };

  try {
    const isFileExist = await checkIsFileExist(oldPath);
    const isFileRenamed = await checkIsFileExist(newPath);

    if (!isFileExist || isFileRenamed) {
      throw new Error(errorMessage);
    } else {
      await fs.rename(oldPath, newPath)
      console.log(successMessage);
    }
  } catch (error) {
    console.error(error.message);
  }
};

rename();