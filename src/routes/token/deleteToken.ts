import { RequestHandler } from 'express';

import Token from '../../models/Token';
import responseTemplate from '../../utils/responseTemplate';
import removeToken from '../../utils/token/removeToken';

const deleteToken: RequestHandler = async (req, res) => {
  try {
    const { token } = req.body;

    const isTokenExist = await Token.findOne({ address: token });
    if (!isTokenExist) {
      return res.status(400).json(
        responseTemplate({
          status: 'error',
          message: 'Token not exists',
          result: {},
        }),
      );
    }

    const tokenDeleted = await removeToken(token);

    return res.status(200).json(
      responseTemplate({
        status: 'success',
        message: 'Deleted token successful',
        result: tokenDeleted?.result,
      }),
    );
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json(
        responseTemplate({
          status: 'error',
          message: e.message,
          result: {},
        }),
      );
    }
  }
};

export default deleteToken;
