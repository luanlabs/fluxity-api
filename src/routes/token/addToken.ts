import { RequestHandler } from 'express';
import { Contract } from 'soroban-client';

import Token from '../../models/Token';
import simulateTransaction from '../../utils/soroban/token/simulateTransaction';
import addTokenToDb from '../../utils/token/addTokenToDb';
import responseTemplate from '../../utils/responseTemplate';
import getServer from '../../utils/soroban/getServer';
import getAccount from '../../utils/soroban/getAccount';
import authAdmin from '../../utils/authAdmin';

const server = getServer();

const addToken: RequestHandler = async (req, res) => {
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
    console.log(1);
    const accountAdmin = await server.getAccount(getAccount.accountAddress());
    console.log(1);
    const contract = new Contract(token);
    console.log(1);
    const getTokenName = simulateTransaction(accountAdmin, contract, 'name');
    console.log(1);
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
    console.log(result);
    if (
      typeof result[0]?.result === 'string' &&
      typeof result[1]?.result === 'string' &&
      typeof result[2]?.result === 'string'
    ) {
      const newToken = await addTokenToDb({
        address: token,
        name: result[0]?.result,
        symbol: result[1]?.result,
        decimals: result[2]?.result,
      });
      console.log(3);
      return res.status(200).json(
        responseTemplate({
          status: 'success',
          message: 'Added token successful',
          result: newToken?.result,
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
