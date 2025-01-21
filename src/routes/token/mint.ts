import { RequestHandler } from 'express';

import Token from '../../models/Token';
import buildMintTransaction from '../../utils/soroban/token/buildMint';
import AlreadyMinted from '../../models/AlreadyMinted';
import finalizeTransaction from '../../utils/soroban/finalizeTransaction';
import log from '../../logger';
import createStreams from '../../utils/soroban/lockup/createMintStream/createStreams';
import getConfig from '../../utils/soroban/getConfig';

const mintToken: RequestHandler = async (req, res) => {
  try {
    const { user } = req.body;
    const { network } = res;

    if (network == 'mainnet') {
      return res.status(400).j({
        status: 'error',
        message: 'Token mint just in testnet network',
        result: {},
      });
    }

    const isUserAlreadyMinted = await AlreadyMinted.findOne({ address: user });
    if (isUserAlreadyMinted) {
      return res.status(400).j({
        status: 'error',
        message: 'User has already minted tokens',
        result: {},
      });
    }

    const { server, admin: admin } = await getConfig(network);

    const tokens = await Token.find({ claimable: true, symbol: { $ne: 'native' } });

    if (!tokens.length) {
      return res.status(404).j({
        status: 'error',
        message: 'Token claimable not found',
        result: {},
      });
    }

    for (let i = 0; i < tokens.length; i++) {
      const mintTx = await buildMintTransaction(admin, tokens[i].address, user);

      await finalizeTransaction(mintTx, server);
    }

    const newAlreadyMinted = new AlreadyMinted({
      address: user,
    });
    await newAlreadyMinted.save();

    log.info(`AlreadMinted save successfully, user: ${newAlreadyMinted.address}`);

    createStreams(tokens[0], user);

    return res.status(200).j({
      status: 'success',
      message: 'Tokens minted successfully',
      result: tokens,
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

export default mintToken;
