import {
  Account,
  xdr,
  Networks,
  TransactionBuilder,
  Operation,
} from 'soroban-client';

import getFee from './getFee';

const baseTransaction = async (
  admin: Account,
  call: xdr.Operation<Operation.InvokeHostFunction>,
) => {
  const fee = getFee();

  let transaction = await new TransactionBuilder(admin, {
    fee,
    networkPassphrase: Networks.FUTURENET,
  });

  transaction = transaction.addOperation(call);

  transaction = transaction.setTimeout(30);
  const transactionBuild = transaction.build();

  return transactionBuild;
};
export default baseTransaction;
