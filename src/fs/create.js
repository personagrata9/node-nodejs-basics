import * as path from 'path';
import * as url from 'url';
import { writeFile } from 'fs/promises';

export const create = async () => {
  const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
  const folderName = 'files';
  
  const fileName = 'fresh.txt';
  const fileContent = 'I am fresh and young';
  const filePath = path.join(__dirname, folderName, fileName);

  const errorMessage = 'FS operation failed';

writeFile(filePath, fileContent, {flag: 'ax'})
  .then(() => console.log(`${fileName} was created successfully in ${folderName} folder!`))
  .catch(() => {
    throw new Error(errorMessage);
  });
};

create();