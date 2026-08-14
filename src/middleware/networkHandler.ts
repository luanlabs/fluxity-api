import { RequestHandler } from 'express';

/**
 * Validates the `:network` route param and exposes it as `res.network`.
 * Rejects anything other than `testnet`/`mainnet` so downstream handlers never
 * run queries with an undefined network.
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

  res.network = network;
  next();
};

export default networkHandler;
