import * as path from 'path';
import * as url from 'url';
import { unlink } from 'fs/promises';

export const remove = async () => {
  const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
  const folderName = 'files';
  const fileToRemoveName = 'fileToRemove.txt';
  const fileToRemovePath = path.join(__dirname, folderName, fileToRemoveName);
  
  const errorMessage = 'FS operation failed';

  await unlink(fileToRemovePath)
    .catch(() => {
      throw new Error(errorMessage);
    })
};

remove();