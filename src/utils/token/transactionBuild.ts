import SorobanClient, { Address } from 'soroban-client';
import dotenv from 'dotenv';

import returnObj from '../returnObj';
import { amountToScVal } from '../amountToSc';

dotenv.config();

const server = new SorobanClient.Server(process.env.SOROBAN_SERVER);

export const transactionMintBuild = async (
  accountAdmin: string,
  sequence: string,
  fee: number,
  contract: any,
  toAddress: string,
) => {
  try {
    const admin = new SorobanClient.Account(accountAdmin, sequence);

    let transaction = await new SorobanClient.TransactionBuilder(admin, {
      fee,
      networkPassphrase: SorobanClient.Networks.FUTURENET,
    });

    const accountIdScVal = await Address.fromString(toAddress).toScVal();

    const amount = amountToScVal('10000000000');

    transaction = transaction.addOperation(
      contract.call('mint', accountIdScVal, amount),
    );

    transaction = transaction.setTimeout(30);
    transaction = transaction.build();
    transaction = await server.prepareTransaction(transaction);

    transaction.sign(
      SorobanClient.Keypair.fromSecret(process.env.ADMIN_SECRET_KEY),
    );

    const response = await server.sendTransaction(transaction);

    return response.hash;
  } catch (e) {
    if (e instanceof Error) {
      return returnObj(false, e.message, null);
    }
  }
};

export const transactionBuild = async (
  accountAdmin: string,
  fee: number,
  contract: any,
  call: string,
) => {
  try {
    let transaction = await new SorobanClient.TransactionBuilder(accountAdmin, {
      fee,
      networkPassphrase: SorobanClient.Networks.FUTURENET,
    });
    transaction = transaction.addOperation(contract.call(call));
    transaction = transaction.setTimeout(30);
    transaction = transaction.build();

    const transactionResult = await server.simulateTransaction(transaction);
    const nativeName = SorobanClient.scValToNative(
      transactionResult.result.retval,
    );
    return nativeName;
  } catch (e) {
    if (e instanceof Error) {
      return returnObj(false, e.message, null);
    }
  }
};

export const transactionBalanceBuild = async (
  accountAdmin: string,
  address: string,
  fee: number,
  contract: any,
) => {
  try {
    const addressScVal = Address.fromString(address).toScVal();
    let transaction = await new SorobanClient.TransactionBuilder(accountAdmin, {
      fee,
      networkPassphrase: SorobanClient.Networks.FUTURENET,
    });
    transaction = transaction.addOperation(
      contract.call('balance', addressScVal),
    );
    transaction = transaction.setTimeout(30);
    transaction = transaction.build();

    const transactionResult = await server.simulateTransaction(transaction);
    const nativeName = SorobanClient.scValToNative(
      transactionResult.result.retval,
    );
    return nativeName;
  } catch (e) {
    if (e instanceof Error) {
      return returnObj(false, e.message, null);
    }
  }
};
