import { Contract } from '@stellar/stellar-sdk';

import simulateTransaction from '../soroban/token/simulateTransaction';
import Token from '../../models/Token';
import log from '../../logger';
import getConfig from '../soroban/getConfig';
import { Network } from '../../types/networkType';

const saveToken = async (token: string, network: Network, logo?: string, claimable?: boolean) => {
  const { admin } = await getConfig(network);
  const contract = new Contract(token);

  const [name, symbol, decimals] = await Promise.all([
    simulateTransaction(admin, contract, 'name', network),
    simulateTransaction(admin, contract, 'symbol', network),
    simulateTransaction(admin, contract, 'decimals', network),
  ]);

  try {
    const newToken = await Token.create({
      address: token,
      name,
      symbol,
      decimals,
      logo,
      claimable,
      network,
    });

    log.info(`Token saved successfully, token: ${newToken.address}, symbol: ${newToken.symbol}`);

    return newToken;
  } catch (error) {
    // Most likely a duplicate-key race: another request saved this token first.
    const existing = await Token.findOne({ address: token, network });

    if (existing) {
      return existing;
    }

    // Genuine failure — surface it so the caller can return an error response.
    throw error;
  }
};

export default saveToken;
