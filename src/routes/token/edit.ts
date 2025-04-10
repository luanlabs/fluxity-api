import { RequestHandler } from 'express';

import Token from '../../models/Token';
import log from '../../logger';

const editTokenRoute: RequestHandler = async (req, res) => {
  try {
    const { logo, claimable } = req.body;
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
      { logo, claimable },
    );

    log.info(
      `Token changed successfully, token: ${tokenEdited?.address}, ${
        claimable ? `claimable: ${claimable}` : ''
      }, ${logo ? `logo: ${logo}` : ''}`,
    );

    return res.status(200).j({
      status: 'success',
      message: 'Token changed successfully',
      result: tokenEdited,
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

export default editTokenRoute;
