import Token from '../../models/Token';
import responseTemplate from '../responseTemplate';
import { TokenType } from '../../models/Token';

const saveToken = async (params: TokenType) => {
  try {
    const newToken = new Token(params);
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

export default saveToken;
