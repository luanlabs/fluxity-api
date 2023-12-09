import { RequestHandler } from 'express';

import Token from '../../models/Token';
import log from '../../logger';

const getTokensRoute: RequestHandler = async (req, res) => {
  try {
    const tokens = await Token.find({});
    return res.status(200).j({
      status: 'success',
      message: 'Tokens have been successfully found',
      result: tokens,
    });
  } catch (e) {
    log.error({ message: e.message });

    return res.status(500).j({
      status: 'error',
      message: e.message,
      result: {},
    });
  }
};
export default getTokensRoute;
