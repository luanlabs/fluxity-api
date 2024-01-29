import { RequestHandler } from 'express';

const networkHandler: RequestHandler = (req, res, next) => {
  if (req.params.network === 'testnet' || req.params.network === 'mainnet') {
    res.network = req.params.network;
  }
  next();
};

export default networkHandler;
