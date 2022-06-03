import * as path from 'path';
import { fileURLToPath } from 'url';
import { createReadStream } from 'fs';

export const read = async () => {
  const __dirname = fileURLToPath(new URL('.', import.meta.url));
  const folderName = 'files';
  const fileToReadName = 'fileToRead.txt';
  const fileToWritePath = path.join(__dirname, folderName, fileToReadName);

  const readableStream = createReadStream(fileToWritePath, 'utf-8');

  let data = '';

  readableStream.on('readable', () => {
    let chunk;
    while ((chunk = readableStream.read()) !== null) {
      data += chunk.toString();
    }
  });

  readableStream.on('end', () => process.stdout.write(`${data}\n`));

  readableStream.on('error', error => console.log('Error', error.message));
};

read();