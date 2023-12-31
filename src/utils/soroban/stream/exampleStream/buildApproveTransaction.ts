import { Account, Contract } from 'stellar-sdk';

import ToScVal from '../../scVal';
import getServer from '../../getServer';
import baseTransaction from '../../baseTransaction';
import getAdmin from '../../getAdmin';

const buildApproveTransaction = async (admin: Account, token: string): Promise<string> => {
  const server = getServer();
  const adminAccount = getAdmin();
  const contract = new Contract(token);

  const from = ToScVal.address(adminAccount.publicKey());
  const spender = ToScVal.address(String(process.env.CONTRACT_ID));
  const amountScVal = ToScVal.i128(BigInt(Number(process.env.AMOUNT_STREAM) * 10000000));
  const { sequence } = await server.getLatestLedger();
  const expirationLedger = ToScVal.u32(sequence + 1000);

  const approveCall = contract.call('approve', from, spender, amountScVal, expirationLedger);

  const transaction = await baseTransaction(admin, approveCall);

  const transactionPrepare = await server.prepareTransaction(transaction);
  transactionPrepare.sign(adminAccount);

  const response = await server.sendTransaction(transactionPrepare);

  return response.hash;
};

export default buildApproveTransaction;
