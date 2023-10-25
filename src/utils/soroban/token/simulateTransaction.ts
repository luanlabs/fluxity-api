import { Account, scValToNative, Contract } from 'soroban-client';

import responseTemplate from '../../responseTemplate';
import createTransaction from '../baseTransaction';

export const simulateTransaction = async (
  admin: Account,
  contract: Contract,
  functionName: string,
) => {
  try {
    const transactionResult = await createTransaction({
      admin: admin,
      contract: contract,
      functionName: functionName,
      type: 'simulate',
    });

    const retval: string = scValToNative(
      Object(transactionResult).result.retval,
    );

    return responseTemplate({
      status: 'success',
      message: 'Simulate transaction successfully',
      result: retval.toString(),
    });
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

export default simulateTransaction;
