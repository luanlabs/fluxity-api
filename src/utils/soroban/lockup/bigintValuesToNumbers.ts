/* eslint-disable @typescript-eslint/no-explicit-any */
const bigintValuesToNumbers = (params: Record<string, any>) => {
  for (const key of Object.keys(params)) {
    if (typeof params[key] === 'bigint') {
      params[key] = Number(params[key]);
    }
  }

  return params;
};
export default bigintValuesToNumbers;
