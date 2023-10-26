import SorobanClient, { Account, Contract, xdr } from 'soroban-client';
import getFee from './getFee';
import getServer from './getServer';
import getAdmin from './getAdmin';
import getNetwork from './getNetwork';
import ToScVal from './scVal';

interface CreateTransactionType {
  admin: Account;
  contract: Contract;
  address?: xdr.ScVal;
  functionName?: string;
  type: 'send' | 'simulate';
}

const createTransaction = async (params: CreateTransactionType) => {
  const server = getServer();
  const fee = getFee();
  const adminAccount = getAdmin();

  let transaction = await new SorobanClient.TransactionBuilder(params.admin, {
    fee,
    networkPassphrase: getNetwork(),
  });

  if (params.address) {
    transaction = transaction.addOperation(
      params.contract.call('mint', params.address, ToScVal.i128('10000000000')),
    );
  } else if (params.functionName) {
    transaction = transaction.addOperation(
      params.contract.call(params.functionName),
    );
  }

  transaction = transaction.setTimeout(30);
  transaction = transaction.build();

  if (params.type === 'send') {
    transaction = await server.prepareTransaction(transaction);
    transaction.sign(adminAccount);
  } else if (params.type === 'simulate') {
    transaction = await server.simulateTransaction(transaction);
  }

  return transaction;
};
export default createTransaction;
