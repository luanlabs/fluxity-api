import { rpc } from '@stellar/stellar-sdk';

import log from '../../logger';

const MAX_ATTEMPTS = 10;
const POLL_INTERVAL_MS = 1000;

/**
 * Polls Soroban RPC until a submitted transaction leaves the `NOT_FOUND` state,
 * then returns it. Throws a descriptive error if it never settles in time.
 */
const finalizeTransaction = async (hash: string, server: rpc.Server) => {
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const tx = await server.getTransaction(hash);

    if (tx.status !== rpc.Api.GetTransactionStatus.NOT_FOUND) {
      return tx;
    }

    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
  }

  log.error(`Transaction not confirmed in time, hash: ${hash}`);
  throw new Error(`Transaction ${hash} was not confirmed within ${MAX_ATTEMPTS} attempts`);
};

export default finalizeTransaction;
