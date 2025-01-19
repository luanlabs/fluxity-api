import { RequestHandler } from 'express';

import Token from '../../models/Token';
import saveToken from '../../utils/token/saveToken';
import log from '../../logger';

const addTokenRoute: RequestHandler = async (req, res) => {
  try {
    const { token, logo, claimable } = req.body;
    const { network } = res;

    const existingToken = await Token.findOne({ address: token });
    if (existingToken) {
      return res.status(400).j({
        status: 'error',
        message: 'Token already exists',
        result: {},
      });
    }

    const newToken = await saveToken(token, network, logo, claimable);

    return res.status(201).j({
      status: 'success',
      message: 'Token has been saved successfully',
      result: newToken,
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

export default addTokenRoute;
