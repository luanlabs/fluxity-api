import { RequestHandler } from 'express';
import SorobanClient from 'soroban-client';
import dotenv from 'dotenv';

import token from '../../models/token';
import { transactionBuild } from '../../utils/token/transactionBuild';
import addTokenToDb from '../../utils/token/addTokenToDb';
import returnObj from '../../utils/returnObj';

dotenv.config();

const server = new SorobanClient.Server(process.env.SOROBAN_SERVER);

const fee = 100;

const addToken: RequestHandler = async (req, res) => {
  try {
    const { tokenAddress } = req.body;

    const findToken = await token.findOne({ address: tokenAddress });
    if (findToken) {
      return res.json(returnObj(false, 'token exist in database', null));
    }

    const accountAdmin = await server.getAccount(process.env.ADMIN_ADDRESS);
    const contract: object = new SorobanClient.Contract(tokenAddress);

    const transactionName = transactionBuild(
      accountAdmin,
      fee,
      contract,
      'name',
    );
    const transactionSymbol = transactionBuild(
      accountAdmin,
      fee,
      contract,
      'symbol',
    );
    const transactionDecimals = transactionBuild(
      accountAdmin,
      fee,
      contract,
      'decimals',
    );

    const result = await Promise.all([
      transactionName,
      transactionSymbol,
      transactionDecimals,
    ]);

    const tokenSaveDb = await addTokenToDb(
      tokenAddress,
      result[0],
      result[1],
      result[2],
    );

    return res.json(tokenSaveDb);
  } catch (e) {
    if (e instanceof Error) {
      return res.json(returnObj(false, e.message, null));
    }
  }
};

export default addToken;
