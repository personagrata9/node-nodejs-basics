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

  const errorMessage = 'FS operation failed';

  let wrongFileIsExist = false;

  await fs.access(newPath)
    .then(() => {
      wrongFileIsExist = true;
    })
    .catch(async () => {
      await fs.rename(oldPath, newPath)
        .catch(() => {
          throw new Error(errorMessage);
        });
    })
    .finally(() => {
      if (wrongFileIsExist) throw new Error(errorMessage);
    })
};

rename();