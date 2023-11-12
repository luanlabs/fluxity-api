import { Account, Contract } from 'soroban-client';

import ToScVal from '../scVal';
import getServer from '../../soroban/getServer';
import baseTransaction from '../baseTransaction';
import getAdmin from '../getAdmin';

const buildMintTransaction = async (
  admin: Account,
  contract: Contract,
  toAddress: string,
): Promise<string> => {
  const server = getServer();
  const adminAccount = getAdmin();

  const address = await ToScVal.address(toAddress);

  const mintCall = contract.call('mint', address, ToScVal.i128(BigInt('10000000000')));

  const transaction = await baseTransaction(admin, mintCall);

  const transactionPrepare = await server.prepareTransaction(transaction);
  transactionPrepare.sign(adminAccount);

  const response = await server.sendTransaction(transactionPrepare);

  return response.hash;
};

export default buildMintTransaction;
