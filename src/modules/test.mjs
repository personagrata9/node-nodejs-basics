import { unknownObject, createMyServer } from './cjsToEsm.mjs';

console.log('UnknownObject is:')
console.log(unknownObject);

const myServer = createMyServer;
const port = 8000;
myServer.listen(port);
console.log(`Local server is running on port ${port}`);
console.log('Press ctrl + c to exit');