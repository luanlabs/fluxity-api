import { Account, Contract, Keypair, Networks, rpc } from '@stellar/stellar-sdk';

import envs from '../../env';
import { Network } from '../../types/networkType';
import getErrorMessage from '../getErrorMessage';

/**
 * Builds the per-network Soroban configuration (RPC server, contract handle,
 * admin keypair) and loads the admin account.
 *
 * Unlike the previous implementation, a transient RPC failure throws instead of
 * calling `process.exit(1)` — a single flaky request must never take down the
 * entire server. Callers already run inside try/catch and translate this into a
 * 5xx response or a retry.
 */
const getConfig = async (network: Network) => {
  const {
    BASE_FEE,
    ADMIN_SECRET_KEY,
    MAINNET_CONTRACT_ID,
    MAINNET_SOROBAN_RPC_URL,
    TESTNET_SOROBAN_RPC_URL,
    TESTNET_CONTRACT_ID,
  } = envs();

  const isMainnet = network === 'mainnet';

  const adminKeypair = Keypair.fromSecret(ADMIN_SECRET_KEY);
  const server = new rpc.Server(isMainnet ? MAINNET_SOROBAN_RPC_URL : TESTNET_SOROBAN_RPC_URL);
  const contract = new Contract(isMainnet ? MAINNET_CONTRACT_ID : TESTNET_CONTRACT_ID);
  const networkPassphrase = isMainnet ? Networks.PUBLIC : Networks.TESTNET;

  let admin: Account;
  try {
    admin = await server.getAccount(adminKeypair.publicKey());
  } catch (error) {
    throw new Error(
      `Failed to load admin account from Soroban RPC (${network}): ${getErrorMessage(error)}`,
      { cause: error },
    );
  }

  return { contract, server, admin, adminKeypair, fee: BASE_FEE, networkPassphrase };
};

export default getConfig;
