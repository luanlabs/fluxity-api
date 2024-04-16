import { RequestHandler } from 'express';

import Token from '../../models/Token';
import log from '../../logger';

const editTokenRoute: RequestHandler = async (req, res) => {
  try {
    const { logo, claimable, important } = req.body;
    const { token } = req.params;
    const { network } = res;

    const existingToken = await Token.findOne({ address: token, network });
    if (!existingToken) {
      return res.status(404).j({
        status: 'error',
        message: 'Token dose not exist',
        result: {},
      });
    }

    const tokenEdited = await Token.findOneAndUpdate(
      { address: token, network },
      { logo, claimable, important },
    );

    log.info({ message: 'Token changed successfully', value: tokenEdited });

    return res.status(200).j({
      status: 'success',
      message: 'Token changed successfully',
      result: tokenEdited,
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

export default editTokenRoute;
