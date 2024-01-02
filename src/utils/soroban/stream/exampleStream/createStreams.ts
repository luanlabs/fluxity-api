import { Account, SorobanRpc } from 'stellar-sdk';

import { IToken } from '../../../../models/Token';
import buildStreamTransaction from './buildStreamTransaction';
import finalizeTransaction from '../../finalizeTransaction';
import getServer from '../../getServer';
import getAdmin from '../../getAdmin';
import buildApproveTransaction from './buildApproveTransaction';
import log from '../../../../logger';

const createStreams = async (token: IToken, address: string) => {
  try {
    const adminAddress = await getAdmin().publicKey();
    const server = await getServer();
    const accountAdmin = await server.getAccount(adminAddress);

    const sequence = BigInt(accountAdmin.sequenceNumber());
    const admin = new Account(accountAdmin.accountId(), sequence.toString());

    const approveTx = await buildApproveTransaction(admin, token.address);
    const finalizeApprove = await finalizeTransaction(approveTx, server);

    if (
      finalizeApprove.status == SorobanRpc.Api.GetTransactionStatus.SUCCESS &&
      finalizeApprove.returnValue
    ) {
      const admin = new Account(accountAdmin.accountId(), (sequence + BigInt(1)).toString());

      const streamTx = await buildStreamTransaction(admin, address, token.address);
      const finalizeStream = await finalizeTransaction(streamTx, server);

      if (
        finalizeStream.status == SorobanRpc.Api.GetTransactionStatus.SUCCESS &&
        finalizeStream.returnValue
      ) {
        // await saveNewStream(scValToNative(finalizeStream.returnValue).toString());
        log.info({ message: 'Create stream for address : ' + address });
      }
    }
  } catch (e) {
    log.error({ message: e.message });
  }
};
export default createStreams;
