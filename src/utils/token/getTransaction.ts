import returnObj from '../returnObj';

const getTransaction = async (hash: string, server: any) => {
  try {
    let status = 'PENDING';

    while (status === 'PENDING') {
      const tx = await server.getTransaction(hash);

      if (tx.status !== 'NOT_FOUND') {
        status = 'COMPLETED';
        return tx;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  } catch (e) {
    if (e instanceof Error) {
      return returnObj(false, e.message, null);
    }
  }
};

export default getTransaction;
