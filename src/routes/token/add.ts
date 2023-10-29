import { RequestHandler } from 'express';
import { Contract } from 'soroban-client';

import Token from '../../models/Token';
import simulateTransaction from '../../utils/soroban/token/simulateTransaction';
import getServer from '../../utils/soroban/getServer';
import getAdmin from '../../utils/soroban/getAdmin';
import { IResponse } from '../../utils/responseType';

const addToken: RequestHandler = async (req, res: IResponse) => {
  try {
    const { token } = req.body;

    const existingToken = await Token.findOne({ address: token });
    if (existingToken) {
      return res.status(400).json({
        status: 'error',
        message: 'Token already exists',
        result: {},
      });
    }

    const server = getServer();
    const accountAdmin = await server.getAccount(getAdmin().publicKey());
    const contract = new Contract(token);

    const getTokenName = simulateTransaction(accountAdmin, contract, 'name');

    const getTokenSymbol = simulateTransaction(
      accountAdmin,
      contract,
      'symbol',
    );

    const getTokenDecimals = simulateTransaction(
      accountAdmin,
      contract,
      'decimals',
    );

    const result = await Promise.all([
      getTokenName,
      getTokenSymbol,
      getTokenDecimals,
    ]);

    const newToken = new Token({
      address: token,
      name: result[0],
      symbol: result[1],
      decimals: result[2],
    });

    await newToken.save();

    return res.status(200).json({
      status: 'success',
      message: 'Token has been saved successfully',
      result: newToken,
    });
  } catch (e: any) {
    return res.status(500).json({
      status: 'error',
      message: e.message,
      result: {},
    });
  }
};

export default addToken;
