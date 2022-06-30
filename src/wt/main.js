import { cpus } from 'os';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { Worker } from 'worker_threads';

const runWorker = (n) => {
  const __dirname = fileURLToPath(new URL('.', import.meta.url));
  const workerPath = path.join(__dirname, 'worker.js');

  return new Promise((resolve, reject) => {
    const worker = new Worker(workerPath, {
      workerData: n
    });
    worker.on('message', (msg) => resolve(msg));
    worker.on('error', reject);
  });
};


export const performCalculations = async () => {
  const numberOfCpus = cpus().length;
  const incrementalNumbersArr = Array(numberOfCpus)
    .fill('')
    .map((_, i) => 10 + i);

  const workers = incrementalNumbersArr.map((n) => runWorker(n));

  const results = (await Promise.allSettled(workers))
    .map((result) => {
      return {
        status: result.status === 'fulfilled' ? 'resolved' : 'error',
        data: result.status === 'fulfilled' ? result.value : null
      };
    });
  console.log(results);
};

performCalculations();