import { Contract } from 'stellar-sdk';

import getAdmin from './getAdmin';
import getMainNetServer from './getMainNetServer';
import getTestNetServer from './getTestNetServer';

const getConfig = async (network: string) => {
  let contract = new Contract(String(process.env.MAINNET_CONTRACT_ID));
  let server = getMainNetServer();
  let admin = await server.getAccount(getAdmin().publicKey());

  if (network === 'testnet') {
    contract = new Contract(String(process.env.TESTNET_CONTRACT_ID));
    server = getTestNetServer();
    admin = await server.getAccount(getAdmin().publicKey());
  }

  return {
    contract,
    server,
    admin,
  };
};
export default getConfig;
