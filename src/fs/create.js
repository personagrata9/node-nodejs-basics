import * as path from 'path';
import * as url from 'url';
import { access, writeFile } from 'fs/promises';

export const create = async () => {
  const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
  const folderName = 'files';
  
  const fileName = 'fresh.txt';
  const fileContent = 'I am fresh and young';
  const filePath = path.join(__dirname, folderName, fileName);

  const successMessage = `File ${fileName} was successfully created!`;
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
    const isFileExist = await checkIsFileExist(filePath);
    
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