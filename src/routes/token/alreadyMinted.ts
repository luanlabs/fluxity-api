import { RequestHandler } from 'express';

import AlreadyMinted from '../../models/AlreadyMinted';
import log from '../../logger';

const alreadyMintedRoute: RequestHandler = async (req, res) => {
  try {
    const { user } = req.params;
    const { network } = res;

    if (network == 'mainnet') {
      return res.status(400).j({
        status: 'error',
        message: 'Already Minted just in testnet network',
        result: {},
      });
    }

    const isUserAlreadyMinted = await AlreadyMinted.findOne({ address: user });
    if (isUserAlreadyMinted) {
      return res.status(200).j({
        status: 'success',
        message: 'User has already minted tokens',
        result: { minted: true },
      });
    }

    return res.status(200).j({
      status: 'success',
      message: 'User has not minted tokens',
      result: { minted: false },
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
export default alreadyMintedRoute;
