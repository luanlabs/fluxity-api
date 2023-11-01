import { RequestHandler } from 'express';

import Token from '../../models/Token';

const getToken: RequestHandler = async (req, res) => {
  try {
    const tokens = await Token.find({});
    return res.status(200).j({
      status: 'success',
      message: 'Tokens have been successfully found',
      result: tokens,
    });
  } catch (e) {
    return res.status(500).j({
      status: 'error',
      message: e.message,
      result: {},
    });
  }
};
export default getToken;
