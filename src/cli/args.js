export const parseArgs = () => {
  const args = process.argv.slice(2);
  const props = args.filter((_, index) => index % 2 === 0);
  const values = args.filter((_, index) => index % 2 !== 0);
  const resultArr = props.map((prop, index) => `${prop.slice(2)} is ${values[index]}`);

  console.log(resultArr.join(', '));
};

parseArgs();