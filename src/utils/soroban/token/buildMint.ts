import { Account, Contract } from 'soroban-client';

import responseTemplate from '../../responseTemplate';
import ToScVal from '../scVal';
import getServer from '../../soroban/getServer';
import createTransaction from '../baseTransaction';

const buildMintTransaction = async (
  admin: Account,
  contract: Contract,
  toAddress: string,
) => {
  try {
    const server = getServer();

    const address = await ToScVal.address(toAddress);
    if (address.value() === undefined) {
      return responseTemplate({
        status: 'error',
        message: 'Address invalid',
        result: {},
      });
    }

    const transaction = await createTransaction({
      admin: admin,
      contract: contract,
      address: address,
      type: 'send',
    });

    const response = await server.sendTransaction(transaction);

    return responseTemplate({
      status: 'success',
      message: 'Sended transaction successfully',
      result: response.hash,
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

export default buildMintTransaction;
