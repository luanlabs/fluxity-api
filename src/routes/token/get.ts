import { RequestHandler } from 'express';

import Token from '../../models/Token';
import log from '../../logger';
import getErrorMessage from '../../utils/getErrorMessage';

const getTokensRoute: RequestHandler = async (_req, res) => {
  try {
    const { network } = res;

    const tokens = await Token.find({ network })
      .collation({ locale: 'en' })
      .sort({ symbol: 1 })
      .exec();

    return res.status(200).j({
      status: 'success',
      message: 'Tokens have been successfully found',
      result: tokens,
    });
  } catch (error) {
    log.error(`Failed to fetch tokens: ${getErrorMessage(error)}`);

    return res.status(500).j({
      status: 'error',
      message: 'Failed to fetch tokens',
      result: {},
    });
  }
};

export default getTokensRoute;
