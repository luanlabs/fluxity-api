import { Contract } from 'stellar-sdk';

import getAdmin from '../soroban/getAdmin';
import getTestNetServer from '../soroban/getTestNetServer';
import simulateTransaction from '../soroban/token/simulateTransaction';
import Token from '../../models/Token';
import log from '../../logger';

const saveToken = async (token: string, network: string, logo?: string, claimable?: boolean) => {
  const server = getTestNetServer();
  const accountAdmin = await server.getAccount(getAdmin().publicKey());
  const contract = new Contract(token);

  const getTokenName = simulateTransaction(accountAdmin, contract, 'name', network);

  const getTokenSymbol = simulateTransaction(accountAdmin, contract, 'symbol', network);

  const getTokenDecimals = simulateTransaction(accountAdmin, contract, 'decimals', network);

  const result = await Promise.all([getTokenName, getTokenSymbol, getTokenDecimals]);

  const newToken = new Token({
    address: token,
    name: result[0],
    symbol: result[1],
    decimals: result[2],
    logo,
    claimable,
    network,
  });

  await newToken.save();

  log.info({ message: 'Token save successfully', value: newToken });

  return newToken;
};

export default saveToken;
