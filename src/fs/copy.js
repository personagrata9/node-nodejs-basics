import * as path from 'path';
import { fileURLToPath } from 'url';
import { checkDirentExist } from './check-dirent-exist.mjs';
import { cp } from 'fs/promises';

export const copy = async () => {
  const __dirname = fileURLToPath(new URL('.', import.meta.url));
  
  const folderName = 'files';
  const srcFolderPath = path.join(__dirname, folderName);
  const destFolderPath = path.join(__dirname, `${folderName}_copy`);

  const successMessage = `Folder ${folderName} was successfully copied!`;
  const errorMessage = 'FS operation failed';

  try {
    const isSrcFolderExist = await checkDirentExist(srcFolderPath);
    const isDestFolderExist = await checkDirentExist(destFolderPath);

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