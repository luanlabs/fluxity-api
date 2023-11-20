import { RequestHandler } from 'express';
import { Contract } from 'soroban-client';

import Token from '../../models/Token';
import simulateTransaction from '../../utils/soroban/token/simulateTransaction';
import getServer from '../../utils/soroban/getServer';
import getAdmin from '../../utils/soroban/getAdmin';

const addTokenRoute: RequestHandler = async (req, res) => {
  try {
    const { token, image } = req.body;

    const existingToken = await Token.findOne({ address: token });
    if (existingToken) {
      return res.status(400).j({
        status: 'error',
        message: 'Token already exists',
        result: {},
      });
    }

    const server = getServer();
    const accountAdmin = await server.getAccount(getAdmin().publicKey());
    const contract = new Contract(token);

    const getTokenName = simulateTransaction(accountAdmin, contract, 'name');

    const getTokenSymbol = simulateTransaction(accountAdmin, contract, 'symbol');

    const getTokenDecimals = simulateTransaction(accountAdmin, contract, 'decimals');

    const result = await Promise.all([getTokenName, getTokenSymbol, getTokenDecimals]);

    const newToken = new Token({
      address: token,
      name: result[0],
      symbol: result[1],
      decimals: result[2],
      image: image,
    });

    await newToken.save();

    return res.status(201).j({
      status: 'success',
      message: 'Token has been saved successfully',
      result: newToken,
    });
  } catch (e) {
    return res.status(500).j({
      status: 'error',
      message: e.message,
      result: {},
    });
  }
};

export default addTokenRoute;
