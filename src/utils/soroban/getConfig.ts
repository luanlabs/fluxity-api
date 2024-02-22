import { Contract, Keypair, SorobanRpc } from 'stellar-sdk';

import getAdmin from './getAdmin';
import { Network } from '../../types/networkType';
import getFee from './getFee';

const getConfig = async (network: Network) => {
  const adminSecretKey = Keypair.fromSecret(String(process.env.ADMIN_SECRET_KEY));
  const fee = getFee();
  if (network === 'mainnet') {
    const contract = new Contract(String(process.env.MAINNET_CONTRACT_ID));
    const server = new SorobanRpc.Server(String(process.env.MAINNET_FUTURENET_RPC_URL));
    const admin = await server.getAccount(getAdmin().publicKey());

    return {
      contract,
      server,
      admin,
      adminSecretKey,
      fee,
    };
  }

  const server = new SorobanRpc.Server(String(process.env.TESTNET_FUTURENET_RPC_URL));

  return {
    contract: new Contract(String(process.env.TESTNET_CONTRACT_ID)),
    server,
    admin: await server.getAccount(getAdmin().publicKey()),
    adminSecretKey,
    fee,
  };
};
export default getConfig;
