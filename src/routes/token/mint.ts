import { RequestHandler } from 'express';

import Token from '../../models/Token';
import buildMintTransaction from '../../utils/soroban/token/buildMint';
import AlreadyMinted from '../../models/AlreadyMinted';
import finalizeTransaction from '../../utils/soroban/finalizeTransaction';
import log from '../../logger';
import createStreams from '../../utils/soroban/lockup/createMintStream/createStreams';
import getConfig from '../../utils/soroban/getConfig';
import getErrorMessage from '../../utils/getErrorMessage';
import { isValidPublicKey } from '../../utils/validation';
import { Networks } from '../../constant/network';

const mintToken: RequestHandler = async (req, res) => {
  try {
    const { user } = req.body;

    if (!isValidPublicKey(user)) {
      return res.status(400).j({
        status: 'error',
        message: 'A valid account address is required',
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

    const { server, admin } = await getConfig(Networks.Testnet);

    const tokens = await Token.find({
      network: Networks.Testnet,
      claimable: true,
      symbol: { $ne: 'native' },
    });

    if (!tokens.length) {
      return res.status(404).j({
        status: 'error',
        message: 'No claimable token found',
        result: {},
      });
    }

    for (const token of tokens) {
      const mintTx = await buildMintTransaction(admin, token.address, user);

      await finalizeTransaction(mintTx, server);
    }

    await AlreadyMinted.create({ address: user });

    log.info(`AlreadyMinted saved successfully, user: ${user}`);

    // Fire-and-forget: streaming a sample lockup should not block the response.
    // createStreams handles its own errors internally.
    void createStreams(tokens[0], user);

    return res.status(200).j({
      status: 'success',
      message: 'Tokens minted successfully',
      result: tokens,
    });
  } catch (error) {
    log.error(`Failed to mint tokens: ${getErrorMessage(error)}`);

    return res.status(500).j({
      status: 'error',
      message: 'Failed to mint tokens',
      result: {},
    });
  }
};

export default mintToken;
