import { RequestHandler } from 'express';
import { Account, Contract } from 'soroban-client';

import Token from '../../models/Token';
import buildMintTransaction from '../../utils/soroban/token/buildMint';
import AlreadyMinted from '../../models/AlreadyMinted';
import finalizeTransaction from '../../utils/token/finalizeTransaction';
import getServer from '../../utils/soroban/getServer';
import getAdmin from '../../utils/soroban/getAdmin';
import { IAlreadyMinted } from '../../models/AlreadyMinted';
import { IResponse } from '../../utils/responseType';

const mintToken: RequestHandler = async (req, res: IResponse) => {
  try {
    const { user } = req.body;

    const isUserAlreadyMinted = await AlreadyMinted.findOne({ address: user });
    if (isUserAlreadyMinted) {
      return res.status(400).json({
        status: 'error',
        message: 'User has already minted tokens',
        result: {},
      });
    }

    const adminAddress = await getAdmin().publicKey();

    const tokens = await Token.find({});
    const server = await getServer();

    const accountAdmin = await server.getAccount(adminAddress);

    for (let i = 0; i < tokens.length; i++) {
      const contract = new Contract(tokens[i].address);

      const sequence = (
        BigInt(accountAdmin.sequenceNumber()) + BigInt(i)
      ).toString();

      const admin = new Account(accountAdmin.accountId(), sequence);

      const mintTx = await buildMintTransaction(admin, contract, user);

      await finalizeTransaction(mintTx, server);
    }

    const newAddress: IAlreadyMinted = {
      address: user,
    };
    const newAlreadyMinted = new AlreadyMinted(newAddress);
    await newAlreadyMinted.save();

    return res.status(200).json({
      status: 'success',
      message: 'Tokens minted successfully',
      result: tokens,
    });
  } catch (e) {
    if (e instanceof Error) {
      return res.status(500).json({
        status: 'error',
        message: e.message,
        result: {},
      });
    }
  }
};

export default mintToken;
