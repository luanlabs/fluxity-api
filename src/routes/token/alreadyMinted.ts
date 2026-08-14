import { RequestHandler } from 'express';

import AlreadyMinted from '../../models/AlreadyMinted';
import log from '../../logger';
import getErrorMessage from '../../utils/getErrorMessage';
import { isValidPublicKey } from '../../utils/validation';

const alreadyMintedRoute: RequestHandler = async (req, res) => {
  try {
    const { user } = req.params;
    const { network } = res;

    if (network === 'mainnet') {
      return res.status(400).j({
        status: 'error',
        message: 'Minting is only available on the testnet network',
        result: {},
      });
    }

    if (!isValidPublicKey(user)) {
      return res.status(400).j({
        status: 'error',
        message: 'A valid account address is required',
        result: {},
      });
    }

    const isUserAlreadyMinted = await AlreadyMinted.findOne({ address: user });

    return res.status(200).j({
      status: 'success',
      message: isUserAlreadyMinted
        ? 'User has already minted tokens'
        : 'User has not minted tokens',
      result: { minted: Boolean(isUserAlreadyMinted) },
    });
  } catch (error) {
    log.error(`Failed to check minted status: ${getErrorMessage(error)}`);

    return res.status(500).j({
      status: 'error',
      message: 'Failed to check minted status',
      result: {},
    });
  }
};

export default alreadyMintedRoute;
