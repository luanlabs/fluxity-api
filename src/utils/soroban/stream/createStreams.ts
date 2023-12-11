import { Account, scValToNative, SorobanRpc } from 'soroban-client';

import { IToken } from '../../../models/Token';
import buildStreamTransaction from './buildStreamTransaction';
import finalizeTransaction from '../../token/finalizeTransaction';
import getServer from '../getServer';
import getAdmin from '../getAdmin';
import saveNewStream from '../../../event/saveNewStream';

const createStreams = async (tokens: IToken[], address: string) => {
  const adminAddress = await getAdmin().publicKey();
  const server = await getServer();
  const accountAdmin = await server.getAccount(adminAddress);

  for (let i = 0; i < tokens.length; i++) {
    const sequence = (BigInt(accountAdmin.sequenceNumber()) + BigInt(i)).toString();

    const admin = new Account(accountAdmin.accountId(), sequence);

    const streamTx = await buildStreamTransaction(admin, address, tokens[i].address);

    const finalize = await finalizeTransaction(streamTx, server);

    if (finalize.status == SorobanRpc.GetTransactionStatus.SUCCESS && finalize.returnValue) {
      await saveNewStream(scValToNative(finalize.returnValue).toString());
    }
  }
};
export default createStreams;
