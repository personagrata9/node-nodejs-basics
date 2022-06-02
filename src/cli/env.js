export const parseEnv = () => {
   const RSSVariables = Object.entries(process.env).filter((entry) => entry[0].startsWith('RSS_'));
   const result = RSSVariables.map((variable) => `${variable[0]}=${variable[1]}`).join('; ');
   console.log(result);
};

parseEnv();