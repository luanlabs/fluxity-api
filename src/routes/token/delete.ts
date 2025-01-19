import { RequestHandler } from 'express';

import Token from '../../models/Token';
import log from '../../logger';

const deleteTokenRoute: RequestHandler = async (req, res) => {
  try {
    const { token } = req.body;
    const { network } = res;

    const existingToken = await Token.findOne({ address: token, network });
    if (!existingToken) {
      return res.status(404).j({
        status: 'error',
        message: 'Token dose not exist',
        result: {},
      });
    }

    const tokenDeleted = await Token.findOneAndDelete({ address: token, network });

    log.info(`Token deleted successfully, token: ${tokenDeleted?.address}`);

    return res.status(200).j({
      status: 'success',
      message: 'Token deleted successfully',
      result: tokenDeleted,
    });
  } catch (e) {
    log.error(e.message);

    return res.status(500).j({
      status: 'error',
      message: e.message,
      result: {},
    });
  }
};

export default deleteTokenRoute;
