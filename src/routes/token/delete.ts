import { RequestHandler } from 'express';

import Token from '../../models/Token';
import responseTemplate from '../../utils/responseTemplate';

const deleteToken: RequestHandler = async (req, res) => {
  try {
    const { token } = req.body;

    const isTokenExist = await Token.findOne({ address: token });
    if (!isTokenExist) {
      return res.status(404).json(
        responseTemplate({
          status: 'error',
          message: 'Token dose not exist',
          result: {},
        }),
      );
    }

    const tokenDeleted = await Token.findOneAndDelete({ address: token });

    return res.status(200).json(
      responseTemplate({
        status: 'success',
        message: 'Token deleted successfully',
        result: tokenDeleted,
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
