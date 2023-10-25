import token from '../../models/Token';
import responseTemplate from '../responseTemplate';
import { TokenType } from '../../models/Token';

const addTokenToDb = async (params: TokenType) => {
  try {
    const tokenDetail: TokenType = {
      address: params.address,
      symbol: params.symbol,
      name: params.name,
      decimals: params.decimals,
    };

    const newToken = new token(tokenDetail);
    await newToken.save();
    return responseTemplate({
      status: 'success',
      message: 'Added token successfully',
      result: newToken,
    });
  } catch (e) {
    if (e instanceof Error) {
      responseTemplate({
        status: 'error',
        message: e.message,
        result: {},
      });
    }
  }
};

export default addTokenToDb;
