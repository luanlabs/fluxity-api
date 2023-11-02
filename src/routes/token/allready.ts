import { RequestHandler } from 'express';

import AlreadyMinted from '../../models/AlreadyMinted';

const AlreadyMintedRoute: RequestHandler = async (req, res) => {
  try {
    const { user } = req.body;

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
    return res.status(500).j({
      status: 'error',
      message: e.message,
      result: {},
    });
  }
};
export default AlreadyMintedRoute;
