import { RequestHandler } from 'express';

import { IResponse } from '../../utils/responseType';
import Token from '../../models/Token';

const getToken: RequestHandler = async (req, res: IResponse) => {
  const tokens = await Token.find({});
  return res.status(200).json({
    status: 'success',
    message: 'Tokens have been successfully found',
    result: tokens,
  });
};
export default getToken;
