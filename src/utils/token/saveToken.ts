import { Contract } from 'stellar-sdk';

import simulateTransaction from '../soroban/token/simulateTransaction';
import Token from '../../models/Token';
import log from '../../logger';
import getConfig from '../soroban/getConfig';
import { Network } from '../../types/networkType';

const saveToken = async (token: string, network: Network, logo?: string, claimable?: boolean) => {
  const { admin } = await getConfig(network);
  const contract = new Contract(token);

  const getTokenName = simulateTransaction(admin, contract, 'name', network);

  const getTokenSymbol = simulateTransaction(admin, contract, 'symbol', network);

  const getTokenDecimals = simulateTransaction(admin, contract, 'decimals', network);

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
