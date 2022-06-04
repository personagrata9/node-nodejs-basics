import * as path from 'path';
import { fileURLToPath } from 'url';
import { createUnzip } from 'zlib';
import { createReadStream, createWriteStream} from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { checkDirentExist } from '../fs/check-dirent-exist.mjs';

export const decompress = async () => {
  const __dirname = fileURLToPath(new URL('.', import.meta.url));
  const folderName = 'files';

  const srcFileName = 'archive.gz';
  const srcFilePath = path.join(__dirname, folderName, srcFileName);

  const destFileName = 'fileToCompress.txt';
  const destFilePath = path.join(__dirname, folderName, destFileName);

  const successMessage = `File ${srcFileName} was successfully decompressed to ${destFileName}!`;
  const errorMessage = `Decompress operation failed: file ${srcFileName} doesn't exist!`;

  const pipe = promisify(pipeline);

  const doUnzip = async (input, output) => {
    const unzip = createUnzip();
    const source = createReadStream(input);
    const destination = createWriteStream(output);
    await pipe(source, unzip, destination);
  };

  try {
    const isSrcFileExist = await checkDirentExist(srcFilePath);

    if (isSrcFileExist) {
      await doUnzip(srcFilePath, destFilePath);
      console.log(successMessage);
    } else {
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error(error.message);
  }
};

decompress();