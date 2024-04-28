import { Account, xdr, Networks, TransactionBuilder, Operation } from '@stellar/stellar-sdk';
import getConfig from './getConfig';
import { Networks as Network } from '../../constant/network';

const baseTransaction = async (
  admin: Account,
  call: xdr.Operation<Operation.InvokeHostFunction>,
) => {
  const { fee } = await getConfig(Network.Testnet);

  let transaction = await new TransactionBuilder(admin, {
    fee,
    networkPassphrase: Networks.TESTNET,
  });

  transaction = transaction.addOperation(call);

  transaction = transaction.setTimeout(30);
  const transactionBuild = transaction.build();

  return transactionBuild;
};
export default baseTransaction;
