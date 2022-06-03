import * as path from 'path';
import * as url from 'url';
import { checkDirentExist } from './check-dirent-exist.mjs';
import { writeFile } from 'fs/promises';

export const create = async () => {
  const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
  const folderName = 'files';
  
  const fileName = 'fresh.txt';
  const fileContent = 'I am fresh and young';
  const filePath = path.join(__dirname, folderName, fileName);

  const successMessage = `File ${fileName} was successfully created!`;
  const errorMessage = 'FS operation failed';

  try {
    const isFileExist = await checkDirentExist(filePath);
    
    if (isFileExist) {
      throw new Error(errorMessage);
    } else {
      await writeFile(filePath, fileContent);
      console.log(successMessage);
    }
  } catch (error) {
    console.error(error.message);
  }
};

create();