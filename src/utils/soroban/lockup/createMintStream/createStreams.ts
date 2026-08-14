import { rpc, scValToNative } from '@stellar/stellar-sdk';

import { IToken } from '../../../../models/Token';
import buildStreamTransaction from './buildStreamTransaction';
import finalizeTransaction from '../../finalizeTransaction';
import buildApproveTransaction from './buildApproveTransaction';
import log from '../../../../logger';
import getConfig from '../../getConfig';
import { Networks } from '../../../../constant/network';
import saveNewLockup from '../../../../event/saveNewLockup';
import getErrorMessage from '../../../getErrorMessage';

const createStreams = async (token: IToken, address: string) => {
  try {
    const { server, admin } = await getConfig(Networks.Testnet);

    const approveTx = await buildApproveTransaction(admin, token.address);

    const finalizeApprove = await finalizeTransaction(approveTx, server);

    if (
      finalizeApprove.status !== rpc.Api.GetTransactionStatus.SUCCESS ||
      !finalizeApprove.returnValue
    ) {
      log.warn(`Approve transaction did not succeed, address: ${address}, token: ${token.address}`);
      return;
    }

    log.info(`Approved stream, address: ${address}, token: ${token.address}`);

    const streamTx = await buildStreamTransaction(admin, address, token.address);

    const finalizeStream = await finalizeTransaction(streamTx, server);

    if (
      finalizeStream.status !== rpc.Api.GetTransactionStatus.SUCCESS ||
      !finalizeStream.returnValue
    ) {
      log.warn(`Stream transaction did not succeed, address: ${address}, token: ${token.address}`);
      return;
    }

    const streamId = scValToNative(finalizeStream.returnValue).toString();

    await saveNewLockup(streamId, Networks.Testnet);

    log.info(`Created stream for address: ${address}, streamId: ${streamId}`);
  } catch (error) {
    log.error(`Failed to create stream for address ${address}: ${getErrorMessage(error)}`);
  }
};

export default createStreams;
