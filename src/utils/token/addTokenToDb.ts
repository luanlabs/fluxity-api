import token from '../../models/token';
import returnObj from '../returnObj';
import { tokenType } from '../interfaces';

const addTokenToDb = async (
  address: string,
  name: string,
  symbol: string,
  decimals: string,
) => {
  const tokenDetail: tokenType = {
    address: address,
    symbol: symbol,
    name: name,
    decimals: decimals,
  };

  try {
    const tokenDb = new token(tokenDetail);
    await tokenDb.save();
    return returnObj(true, 'add token to database', tokenDb);
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
      return returnObj(false, e.message, null);
    }
  }
};

export default addTokenToDb;
