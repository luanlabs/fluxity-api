import { rpc } from '@stellar/stellar-sdk';

import log from '../../logger';

const finalizeTransaction = async (hash: string, server: rpc.Server) => {
  for (let index = 0; index < 10; index++) {
    const tx = await server.getTransaction(hash);

    if (tx.status !== 'NOT_FOUND') {
      return tx;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  const tx = await server.getTransaction(hash);

  log.error(`Transaction feild, hash: ${hash}, message: ${tx.status}`);
  throw Error;
};

export default finalizeTransaction;
