import responseTemplate from '../responseTemplate';
import { Server } from 'soroban-client';

const getTransaction = async (hash: string, server: Server) => {
  try {
    let status = 'PENDING';

    while (status === 'PENDING') {
      const tx = await server.getTransaction(hash);

      if (tx.status !== 'NOT_FOUND') {
        status = 'COMPLETED';
        return responseTemplate({
          status: 'success',
          message: 'Transaction completed',
          result: tx,
        });
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  } catch (e) {
    if (e instanceof Error) {
      return responseTemplate({
        status: 'error',
        message: e.message,
        result: {},
      });
    }
  }
};

export default getTransaction;
