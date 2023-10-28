import { RequestHandler } from 'express';
import { Contract } from 'soroban-client';

import Token from '../../models/Token';
import simulateTransaction from '../../utils/soroban/token/simulateTransaction';
import saveToken from '../../utils/token/saveToken';
import responseTemplate from '../../utils/responseTemplate';
import getServer from '../../utils/soroban/getServer';
import getAdmin from '../../utils/soroban/getAdmin';

const server = getServer();

const addToken: RequestHandler = async (req, res) => {
  try {
    const { token } = req.body;

    const isTokenExist = await Token.findOne({ address: token });
    if (isTokenExist) {
      return res.status(400).json(
        responseTemplate({
          status: 'error',
          message: 'Token already exists',
          result: {},
        }),
      );
    }

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

    if (
      typeof result[0]?.result === 'string' &&
      typeof result[1]?.result === 'string' &&
      typeof result[2]?.result === 'string'
    ) {
      const newToken = await saveToken({
        address: token,
        name: result[0]?.result,
        symbol: result[1]?.result,
        decimals: result[2]?.result,
      });

      return res.status(200).json(
        responseTemplate({
          status: 'success',
          message: 'Token has been saved successfully',
          result: newToken?.result,
        }),
      );
    } else {
      return res.status(500).json(
        responseTemplate({
          status: 'error',
          message: 'Failed get token name, symbol or desimals',
          result: {},
        }),
      );
    }
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

export default addToken;
