import { Contract } from 'soroban-client';
import getAdmin from '../soroban/getAdmin';
import getServer from '../soroban/getServer';
import simulateTransaction from '../soroban/token/simulateTransaction';
import Token from '../../models/Token';

const saveToken = async (token: string, logo?: string, claimable?: boolean) => {
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
    logo,
    claimable,
  });

  await newToken.save();

  return newToken;
};

export default saveToken;
