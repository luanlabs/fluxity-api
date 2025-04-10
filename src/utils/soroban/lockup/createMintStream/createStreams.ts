import { Account, SorobanRpc, scValToNative } from 'stellar-sdk';

import { IToken } from '../../../../models/Token';
import buildStreamTransaction from './buildStreamTransaction';
import finalizeTransaction from '../../finalizeTransaction';
import buildApproveTransaction from './buildApproveTransaction';
import log from '../../../../logger';
import getConfig from '../../getConfig';
import { Networks } from '../../../../constant/network';
import saveNewLockup from '../../../../event/saveNewLockup';

const createStreams = async (token: IToken, address: string) => {
  try {
    const { server, admin: accountAdmin } = await getConfig(Networks.Testnet);

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
        const streamId = scValToNative(finalizeStream.returnValue).toString();

        await saveNewLockup(streamId, Networks.Testnet);

        log.info({ message: 'Create stream for address : ' + address });
      }
    }
  } catch (e) {
    console.log(e);

    log.error({ message: e.message });
  }
};
export default createStreams;
