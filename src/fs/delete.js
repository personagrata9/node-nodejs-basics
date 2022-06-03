import * as path from 'path';
import * as url from 'url';
import { access, unlink } from 'fs/promises';

export const remove = async () => {
  const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
  const folderName = 'files';
  const fileToRemoveName = 'fileToRemove.txt';
  const fileToRemovePath = path.join(__dirname, folderName, fileToRemoveName);
  
  const successMessage = `File ${fileToRemoveName} was successfully deleted!`;
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
    const ifFileExist = await checkIsFileExist(fileToRemovePath);

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