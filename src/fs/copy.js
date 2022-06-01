import * as path from 'path';
import * as url from 'url';
import { cp } from 'fs/promises';

export const copy = async () => {
  const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

  const srcFolderPath = path.join(__dirname, 'files');
  const destFolderPath = path.join(__dirname, 'files_copy');

  const errorMessage = 'FS operation failed';

  await cp(srcFolderPath, destFolderPath, { errorOnExist: true, force: false, recursive: true})
    .catch(() => {
      throw new Error(errorMessage);
    });
};

copy();