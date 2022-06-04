import * as path from 'path';
import { fileURLToPath } from 'url';
import { fork } from 'child_process';

export const spawnChildProcess = async (args) => {
  const __dirname = fileURLToPath(new URL('.', import.meta.url));
  const childPath = path.join(__dirname, 'files', 'script.js');
  
  const child = fork(childPath, args, { stdio: ['pipe', 'pipe', 'pipe', 'ipc']});

  process.stdin.pipe(child.stdin);

  child.stdout.on('data', (data) => {
    process.stdout.write(`Received from child process:\n${data}\n`);
  });
};

const args = process.argv.slice(2);

spawnChildProcess(args);