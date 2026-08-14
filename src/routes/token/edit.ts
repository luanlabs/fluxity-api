import { RequestHandler } from 'express';

import Token from '../../models/Token';
import log from '../../logger';
import getErrorMessage from '../../utils/getErrorMessage';
import { isValidContractAddress } from '../../utils/validation';

const editTokenRoute: RequestHandler = async (req, res) => {
  try {
    const { logo, claimable } = req.body;
    const { token } = req.params;
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

    if (claimable !== undefined && typeof claimable !== 'boolean') {
      return res
        .status(400)
        .j({ status: 'error', message: 'claimable must be a boolean', result: {} });
    }

    const update: Partial<{ logo: string; claimable: boolean }> = {};
    if (logo !== undefined) update.logo = logo;
    if (claimable !== undefined) update.claimable = claimable;

    const tokenEdited = await Token.findOneAndUpdate({ address: token, network }, update, {
      new: true,
    });

    if (!tokenEdited) {
      return res.status(404).j({
        status: 'error',
        message: 'Token does not exist',
        result: {},
      });
    }

    log.info(`Token updated successfully, token: ${tokenEdited.address}`);

    return res.status(200).j({
      status: 'success',
      message: 'Token changed successfully',
      result: tokenEdited,
    });
  } catch (error) {
    log.error(`Failed to edit token: ${getErrorMessage(error)}`);

    return res.status(500).j({
      status: 'error',
      message: 'Failed to edit token',
      result: {},
    });
  }
};

export default editTokenRoute;
