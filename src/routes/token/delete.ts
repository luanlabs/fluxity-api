import { RequestHandler } from 'express';

import Token from '../../models/Token';
import log from '../../logger';
import getErrorMessage from '../../utils/getErrorMessage';
import { isValidContractAddress } from '../../utils/validation';

const deleteTokenRoute: RequestHandler = async (req, res) => {
  try {
    const { token } = req.body;
    const { network } = res;

    if (!isValidContractAddress(token)) {
      return res.status(400).j({
        status: 'error',
        message: 'A valid token contract address is required',
        result: {},
      });
    }

    const tokenDeleted = await Token.findOneAndDelete({ address: token, network });

    if (!tokenDeleted) {
      return res.status(404).j({
        status: 'error',
        message: 'Token does not exist',
        result: {},
      });
    }

    log.info(`Token deleted successfully, token: ${tokenDeleted.address}`);

    return res.status(200).j({
      status: 'success',
      message: 'Token deleted successfully',
      result: tokenDeleted,
    });
  } catch (error) {
    log.error(`Failed to delete token: ${getErrorMessage(error)}`);

    return res.status(500).j({
      status: 'error',
      message: 'Failed to delete token',
      result: {},
    });
  }
};

export default deleteTokenRoute;
