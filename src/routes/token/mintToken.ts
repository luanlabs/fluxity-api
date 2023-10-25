import { RequestHandler } from 'express';
import { Account, Contract } from 'soroban-client';

import buildMintTransaction from '../../utils/soroban/token/buildMint';
import address from '../../models/AlreadyMinted';
import getToken from '../../utils/token/getToken';
import responseTemplate from '../../utils/responseTemplate';
import getTransaction from '../../utils/token/getTransaction';
import addAlreadyMintedToDB from '../../utils/address/addAlreadyMintedToDB';
import getServer from '../../utils/soroban/getServer';
import getAccount from '../../utils/soroban/getAccount';
import authAdmin from '../../utils/authAdmin';

const mintToken: RequestHandler = async (req, res) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(400).json(
        responseTemplate({
          status: 'error',
          message: 'Authorization not found',
          result: {},
        }),
      );
    } else {
      if (!authAdmin(authorization)) {
        return res.status(400).json(
          responseTemplate({
            status: 'error',
            message: 'Access not found',
            result: {},
          }),
        );
      }
    }

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
    console.log(1);
    const adminAddress = await getAccount.accountAddress();
    console.log(adminAddress);
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

      if (typeof mintTx?.result === 'string')
        await getTransaction(mintTx?.result, server);
    }

    await addAlreadyMintedToDB(user);

    return res.status(200).json(
      responseTemplate({
        status: 'success',
        message: 'Minted tokens',
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
