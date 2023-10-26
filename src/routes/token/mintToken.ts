import { RequestHandler } from 'express';
import { Account, Contract } from 'soroban-client';

import buildMintTransaction from '../../utils/soroban/token/buildMint';
import address from '../../models/AlreadyMinted';
import getToken from '../../utils/token/getTokens';
import responseTemplate from '../../utils/responseTemplate';
import getTransaction from '../../utils/token/getTransaction';
import addAlreadyMintedToDB from '../../utils/address/addAlreadyMintedToDB';
import getServer from '../../utils/soroban/getServer';
import getAdmin from '../../utils/soroban/getAdmin';

const mintToken: RequestHandler = async (req, res) => {
  try {
    const { user } = req.body;

    const isUserAlreadyMinted = await address.findOne({ address: user });
    if (isUserAlreadyMinted) {
      return res.status(400).json(
        responseTemplate({
          status: 'error',
          message: 'User has already minted tokens',
          result: {},
        }),
      );
    }

    const adminAddress = await getAdmin().publicKey();

    const tokens = await getToken();
    const server = await getServer();

    const accountAdmin = await server.getAccount(adminAddress);

    for (let i = 0; i < tokens.length; i++) {
      const contract = new Contract(tokens[i].address);

      const sequence = (
        BigInt(accountAdmin.sequenceNumber()) + BigInt(i)
      ).toString();

      const admin = new Account(accountAdmin.accountId(), sequence);

      const mintTx = await buildMintTransaction(admin, contract, user);

      if (mintTx?.status === 'error') {
        return res.status(500).json(mintTx);
      }

      if (typeof mintTx?.result === 'string') {
        await getTransaction(mintTx?.result, server);
      }
    }

    await addAlreadyMintedToDB(user);

    return res.status(200).json(
      responseTemplate({
        status: 'success',
        message: 'Tokens minted successfully',
        result: tokens,
      }),
    );
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json(
        responseTemplate({
          status: 'error',
          message: e.message,
          result: {},
        }),
      );
    }
  }
};

export default mintToken;
