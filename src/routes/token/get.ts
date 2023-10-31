import { RequestHandler } from 'express';

import Token from '../../models/Token';

const getToken: RequestHandler = async (req, res) => {
  const tokens = await Token.find({});
  return res.status(200).j({
    status: 'success',
    message: 'Tokens have been successfully found',
    result: tokens,
  });
};
export default getToken;
