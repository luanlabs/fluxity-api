import { RequestHandler } from 'express';

import Token from '../../models/Token';
import { IResponse } from '../../utils/responseType';

const deleteToken: RequestHandler = async (req, res: IResponse) => {
  try {
    const { token } = req.body;

    const existingToken = await Token.findOne({ address: token });
    if (!existingToken) {
      return res.status(404).json({
        status: 'error',
        message: 'Token dose not exist',
        result: {},
      });
    }

    const tokenDeleted = await Token.findOneAndDelete({ address: token });

    return res.status(200).json({
      status: 'success',
      message: 'Token deleted successfully',
      result: tokenDeleted,
    });
  } catch (e: any) {
    return res.status(500).json({
      status: 'error',
      message: e.message,
      result: {},
    });
  }
};

export default deleteToken;
