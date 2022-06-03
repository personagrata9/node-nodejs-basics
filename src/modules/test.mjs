import { unknownObject, createMyServer } from './cjsToEsm.mjs';

console.log('UnknownObject is:')
console.log(unknownObject);

const myServer = createMyServer;
const PORT = 8000;
myServer.listen(PORT, () => {
  console.log(`Local server is running on port ${PORT}`);
  console.log('Press ctrl + c to exit');
});