import * as path from 'path';
import { fileURLToPath } from 'url';
import { createWriteStream } from 'fs';

export const write = async () => {
  const __dirname = fileURLToPath(new URL('.', import.meta.url));
  const folderName = 'files';
  const fileToWriteName = 'fileToWrite.txt';
  const fileToWritePath = path.join(__dirname, folderName, fileToWriteName);

  console.log(`Enter text to write it into file ${fileToWriteName} or press ctrl + c to exit`);

  process.stdin.on('data', (chunk) => {
    const writableToFileStream = createWriteStream(fileToWritePath, { flags: 'a'});
    writableToFileStream.write(chunk.toString());
    writableToFileStream.close();
  })
};

write();