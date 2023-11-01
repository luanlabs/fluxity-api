import {
  Account,
  Contract,
  xdr,
  Networks,
  TransactionBuilder,
} from 'soroban-client';
import getFee from './getFee';
import ToScVal from './scVal';

interface ICreateTransaction {
  admin: Account;
  contract: Contract;
  address?: xdr.ScVal;
  functionName?: string;
  type: 'send' | 'simulate';
}

const baseTransaction = async (params: ICreateTransaction) => {
  const fee = getFee();

  let transaction = await new TransactionBuilder(params.admin, {
    fee,
    networkPassphrase: Networks.FUTURENET,
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
  const transactionBuild = transaction.build();

  return transactionBuild;
};
export default baseTransaction;
