import { RequestHandler } from 'express';

import { isMainnetEnabled } from '../env';

/**
 * Validates the `:network` route param and exposes it as `res.network`.
 * Rejects unsupported networks so downstream handlers never run queries with
 * an undefined or unconfigured network.
 */
const networkHandler: RequestHandler = (req, res, next) => {
  const { network } = req.params;

  if (network !== 'testnet' && network !== 'mainnet') {
    return res.status(400).j({
      status: 'error',
      message: 'Invalid network, must be "testnet" or "mainnet"',
      result: {},
    });
  }

  if (network === 'mainnet' && !isMainnetEnabled()) {
    return res.status(404).j({
      status: 'error',
      message: 'Mainnet is not supported by this API instance',
      result: {},
    });
  }

  res.network = network;
  next();
};

export default networkHandler;
