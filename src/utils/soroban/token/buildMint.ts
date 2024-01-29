import { Account, Contract } from 'stellar-sdk';

import ToScVal from '../scVal';
import baseTransaction from '../baseTransaction';
import getAdmin from '../getAdmin';
import getConfig from '../getConfig';

const buildMintTransaction = async (
  admin: Account,
  token: string,
  toAddress: string,
): Promise<string> => {
  const { server } = await getConfig('testnet');
  const adminAccount = getAdmin();
  const contract = new Contract(token);

  const address = await ToScVal.address(toAddress);

  const mintCall = contract.call('mint', address, ToScVal.i128(BigInt('10000000000')));

  const transaction = await baseTransaction(admin, mintCall);

  const transactionPrepare = await server.prepareTransaction(transaction);
  transactionPrepare.sign(adminAccount);

  const response = await server.sendTransaction(transactionPrepare);

  return response.hash;
};

export default buildMintTransaction;
