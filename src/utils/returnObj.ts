import { returnObjectType } from './interfaces';

const returnObj = (
  status: boolean,
  message: string,
  resault: object | null,
) => {
  const obj: returnObjectType = {
    status: status,
    message: message,
    resault: resault,
  };
  return obj;
};

export default returnObj;
