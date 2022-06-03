import * as path from 'path';
import * as url from 'url';
import { access, readdir } from 'fs/promises';

export const list = async () => {
  const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
  const folderName = 'files';
  const folderPath = path.join(__dirname, folderName);

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
    const isFolderExist = await checkIsFolderExist(folderPath);

    if (!isFolderExist) {
      throw new Error(errorMessage);
    } else {
      const dirents = await readdir(folderPath, { withFileTypes: true });

      const files = dirents.filter((dirent) => dirent.isFile()).map((file) => file.name);
      console.log(files);
    }
  } catch (error) {
    console.error(error.message);
  }
};

list();