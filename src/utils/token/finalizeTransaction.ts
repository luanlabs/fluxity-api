import { Server } from 'soroban-client';

const finalizeTransaction = async (hash: string, server: Server) => {
  for (let index = 0; index < 10; index++) {
    const tx = await server.getTransaction(hash);

    if (tx.status !== 'NOT_FOUND') {
      return tx;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  throw Error;
};

export default finalizeTransaction;
