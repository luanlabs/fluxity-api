import Token from '../../models/Token';
import responseTemplate from '../responseTemplate';

const removeToken = async (token: string) => {
  try {
    const tokenDeleted = await Token.findOneAndDelete({ address: token });
    return responseTemplate({
      status: 'success',
      message: 'Deleted token successfully',
      result: tokenDeleted,
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

export default removeToken;
