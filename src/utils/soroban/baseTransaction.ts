import {
  Account,
  xdr,
  Networks,
  TransactionBuilder,
  Operation,
} from 'soroban-client';

import getFee from './getFee';

interface ICreateTransaction {
  admin: Account;
  contract: xdr.Operation<Operation.InvokeHostFunction>;
}

const baseTransaction = async (params: ICreateTransaction) => {
  const fee = getFee();

  let transaction = await new TransactionBuilder(params.admin, {
    fee,
    networkPassphrase: Networks.FUTURENET,
  });

  transaction = transaction.addOperation(params.contract);

  transaction = transaction.setTimeout(30);
  const transactionBuild = transaction.build();

  return transactionBuild;
};
export default baseTransaction;
