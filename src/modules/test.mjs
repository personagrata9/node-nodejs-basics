import { unknownObject, createMyServer } from './cjsToEsm.mjs';

console.log('UnknownObject is:')
console.log(unknownObject);

const myServer = createMyServer;
const PORT = 8000;
myServer.listen(PORT, () => {
  console.log(`Local server is started at port :${PORT}`);
  console.log('Press ctrl + c to exit');
});