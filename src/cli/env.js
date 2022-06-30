export const parseEnv = () => {
   const RSSVariables = Object.entries(process.env).filter((entry) => entry[0].startsWith('RSS_'));
   const resultArr = RSSVariables.map((variable) => `${variable[0]}=${variable[1]}`);
   
   if (resultArr.length) console.log(resultArr.join('; '));
};

parseEnv();