import { Account, xdr, Networks, TransactionBuilder, Operation } from '@stellar/stellar-sdk';

import envs from '../../env';

/**
 * Builds a single-operation Soroban transaction.
 *
 * The fee is read directly from configuration (no extra RPC round-trip), and the
 * network passphrase defaults to Testnet for backwards compatibility while
 * allowing callers to pass the correct one for the network in use.
 */
const baseTransaction = (
  admin: Account,
  call: xdr.Operation<Operation.InvokeHostFunction>,
  networkPassphrase: string = Networks.TESTNET,
) => {
  const { BASE_FEE } = envs();

  return new TransactionBuilder(admin, { fee: BASE_FEE, networkPassphrase })
    .addOperation(call)
    .setTimeout(30)
    .build();
};

export default baseTransaction;
