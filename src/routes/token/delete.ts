import { RequestHandler } from 'express';

import Token from '../../models/Token';

const deleteTokenRoute: RequestHandler = async (req, res) => {
  try {
    const { token } = req.body;

    const existingToken = await Token.findOne({ address: token });
    if (!existingToken) {
      return res.status(404).j({
        status: 'error',
        message: 'Token dose not exist',
        result: {},
      });
    }

    const tokenDeleted = await Token.findOneAndDelete({ address: token });

    return res.status(200).j({
      status: 'success',
      message: 'Token deleted successfully',
      result: tokenDeleted,
    });
  } catch (e) {
    return res.status(500).j({
      status: 'error',
      message: e.message,
      result: {},
    });
  }
};

export default deleteTokenRoute;
