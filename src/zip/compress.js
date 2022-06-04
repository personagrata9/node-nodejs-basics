import * as path from 'path';
import { fileURLToPath } from 'url';
import { createGzip } from 'zlib';
import { createReadStream, createWriteStream} from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { checkDirentExist } from '../fs/check-dirent-exist.mjs';

export const compress = async () => {
  const __dirname = fileURLToPath(new URL('.', import.meta.url));
  const folderName = 'files';

  const srcFileName = 'fileToCompress.txt';
  const srcFilePath = path.join(__dirname, folderName, srcFileName);

  const destFileName = 'archive.gz';
  const destFilePath = path.join(__dirname, folderName, destFileName);

  const successMessage = `File ${srcFileName} was successfully compressed to ${destFileName}!`;
  const errorMessage = `Compress operation failed: file ${srcFileName} doesn't exist!`

  const pipe = promisify(pipeline);

  const doGzip = async (input, output) => {
    const gzip = createGzip();
    const source = createReadStream(input);
    const destination = createWriteStream(output);
    await pipe(source, gzip, destination);
  }

  try {
    const isSrcFileExist = await checkDirentExist(srcFilePath);

    if (isSrcFileExist) {
      await doGzip(srcFilePath, destFilePath);
      console.log(successMessage)
    } else {
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error(error.message)
  }
};

compress();