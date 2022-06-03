export const parseArgs = () => {
  const resultArr = [];
  const args = process.argv.slice(2);

  args.forEach((arg, index) => {
    if (arg.startsWith('--')) {
      const prop = arg.slice(2);
      const value = !args[index + 1].startsWith('--') ? args[index + 1] : true;
      resultArr.push(`${prop} is ${value}`);
    }
  })

  console.log(resultArr.join(', '));
};

parseArgs();