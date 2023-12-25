import { Account, scValToNative, SorobanRpc } from 'stellar-sdk';

import { IToken } from '../../../../models/Token';
import buildStreamTransaction from './buildStreamTransaction';
import finalizeTransaction from '../../finalizeTransaction';
import getServer from '../../getServer';
import getAdmin from '../../getAdmin';
import saveNewStream from '../../../../event/saveNewStream';
import buildApproveTransaction from './buildApproveTransaction';
import log from '../../../../logger';

const createStreams = async (tokens: IToken[], address: string) => {
  try {
    const adminAddress = await getAdmin().publicKey();
    const server = await getServer();
    const accountAdmin = await server.getAccount(adminAddress);

    for (let i = 0; i < tokens.length; i++) {
      const sequence = BigInt(accountAdmin.sequenceNumber()) + BigInt(i * 2);
      const admin = new Account(accountAdmin.accountId(), sequence.toString());

      const approveTx = await buildApproveTransaction(admin, tokens[i].address);
      const finalizeApprove = await finalizeTransaction(approveTx, server);

      if (
        finalizeApprove.status == SorobanRpc.Api.GetTransactionStatus.SUCCESS &&
        finalizeApprove.returnValue
      ) {
        const admin = new Account(accountAdmin.accountId(), (sequence + BigInt(1)).toString());

        const streamTx = await buildStreamTransaction(admin, address, tokens[i].address);
        const finalizeStream = await finalizeTransaction(streamTx, server);

        if (
          finalizeStream.status == SorobanRpc.Api.GetTransactionStatus.SUCCESS &&
          finalizeStream.returnValue
        ) {
          await saveNewStream(scValToNative(finalizeStream.returnValue).toString());
        }
      }
    }
  } catch (e) {
    log.error({ message: e.message });
  }
};
export default createStreams;
