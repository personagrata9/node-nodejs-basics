import * as path from 'path';
import * as url from 'url';
import { access, cp } from 'fs/promises';

export const copy = async () => {
  const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
  
  const folderName = 'files';
  const srcFolderPath = path.join(__dirname, folderName);
  const destFolderPath = path.join(__dirname, `${folderName}_copy`);

  const successMessage = `Folder ${folderName} was successfully copied!`;
  const errorMessage = 'FS operation failed';

  const checkIsFolderExist = async (folderPath) => {
    try {
      await access(folderPath);
      return true;
    } catch {
      return false;
    }
  };

  try {
    const isSrcFolderExist = await checkIsFolderExist(srcFolderPath);
    const isDestFolderExist = await checkIsFolderExist(destFolderPath);

    if (!isSrcFolderExist || isDestFolderExist) {
      throw new Error(errorMessage);
    } else {
      await cp(srcFolderPath, destFolderPath, { recursive: true});
      console.log(successMessage);
    }
  } catch (error) {
    console.error(error.message);
  }
};

copy();