import { RequestHandler } from 'express';

import Token from '../../models/Token';
import saveToken from '../../utils/token/saveToken';
import log from '../../logger';
import getErrorMessage from '../../utils/getErrorMessage';
import { isValidContractAddress } from '../../utils/validation';

const addTokenRoute: RequestHandler = async (req, res) => {
  try {
    const { token, logo } = req.body;
    const { network } = res;

    if (!isValidContractAddress(token)) {
      return res.status(400).j({
        status: 'error',
        message: 'A valid token contract address is required',
        result: {},
      });
    }

    if (logo !== undefined && typeof logo !== 'string') {
      return res.status(400).j({ status: 'error', message: 'logo must be a string', result: {} });
    }

    const existingToken = await Token.findOne({ address: token, network });
    if (existingToken) {
      return res.status(400).j({
        status: 'error',
        message: 'Token already exists',
        result: {},
      });
    }

    const newToken = await saveToken(token, network, logo);

    return res.status(201).j({
      status: 'success',
      message: 'Token has been saved successfully',
      result: newToken,
    });
  } catch (error) {
    log.error(`Failed to add token: ${getErrorMessage(error)}`);

    return res.status(500).j({
      status: 'error',
      message: 'Failed to add token',
      result: {},
    });
  }
};

export default addTokenRoute;
