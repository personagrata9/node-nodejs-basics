import * as path from 'path';
import { fileURLToPath } from 'url';
import { checkDirentExist } from './check-dirent-exist.mjs';
import { unlink } from 'fs/promises';

export const remove = async () => {
  const __dirname = fileURLToPath(new URL('.', import.meta.url));
  const folderName = 'files';
  const fileToRemoveName = 'fileToRemove.txt';
  const fileToRemovePath = path.join(__dirname, folderName, fileToRemoveName);
  
  const successMessage = `File ${fileToRemoveName} was successfully deleted!`;
  const errorMessage = 'FS operation failed';

  try {
    const ifFileExist = await checkDirentExist(fileToRemovePath);

    if (!ifFileExist) {
      throw new Error(errorMessage);
    } else {
      await unlink(fileToRemovePath)
      console.log(successMessage);
    }
  } catch (error) {
    console.error(error.message);
  }
};

remove();