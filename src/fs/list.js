import * as path from 'path';
import * as url from 'url';
import { access, readdir } from 'fs/promises';

export const list = async () => {
  const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
  const folderName = 'files';
  const folderPath = path.join(__dirname, folderName);

  const errorMessage = 'FS operation failed';

  await access(folderPath)
    .then(async () => {
    //   const dirents = await readdir(folderPath, { withFileTypes: true });

    //   const files = dirents.filter((dirent) => dirent.isFile()).map((file) => file.name);
    //   console.log(files);

      const files = await readdir(folderPath, { withFileTypes: true });

      files.forEach((file) => {
        if (file.isFile()) {
          console.log(file.name);
        }
      })
    })
    .catch(() => {
      throw new Error(errorMessage);
    })
};

list();