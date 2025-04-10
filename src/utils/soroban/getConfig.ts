import { Contract, Keypair, rpc } from '@stellar/stellar-sdk';

import envs from '../../env';
import { Network } from '../../types/networkType';

const getConfig = async (network: Network) => {
  const {
    BASE_FEE,
    ADMIN_SECRET_KEY,
    MAINNET_CONTRACT_ID,
    MAINNET_SOROBAN_RPC_URL,
    TESTNET_SOROBAN_RPC_URL,
    TESTNET_CONTRACT_ID,
  } = envs();
  const adminKeypair = Keypair.fromSecret(ADMIN_SECRET_KEY);
  const fee = BASE_FEE || '100000';
  if (network === 'mainnet') {
    const contract = new Contract(MAINNET_CONTRACT_ID);
    const server = new rpc.Server(MAINNET_SOROBAN_RPC_URL);
    const admin = await server.getAccount(adminKeypair.publicKey());

    return {
      contract,
      server,
      admin,
      adminKeypair,
      fee,
    };
  }

  const server = new rpc.Server(TESTNET_SOROBAN_RPC_URL);
  const contract = new Contract(TESTNET_CONTRACT_ID);
  const admin = await server.getAccount(adminKeypair.publicKey());

  return {
    contract,
    server,
    admin,
    adminKeypair,
    fee,
  };
};
export default getConfig;
