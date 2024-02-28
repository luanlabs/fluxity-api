import { Account, Contract } from 'stellar-sdk';

import ToScVal from '../../scVal';
import baseTransaction from '../../baseTransaction';
import getConfig from '../../getConfig';
import { Networks } from '../../../../constant/network';

const buildApproveTransaction = async (admin: Account, token: string): Promise<string> => {
  const { server, contract: contractId, adminKeypair } = await getConfig(Networks.Testnet);
  const contract = new Contract(token);
  const from = ToScVal.address(adminKeypair.publicKey());
  const spender = ToScVal.address(contractId.address().toString());
  const amountScVal = ToScVal.i128(BigInt(Number(process.env.CLAIM_STREAM_AMOUNT) * 10 ** 7));
  const { sequence } = await server.getLatestLedger();
  const expirationLedger = ToScVal.u32(sequence + 1000);

  const approveCall = contract.call('approve', from, spender, amountScVal, expirationLedger);

  const transaction = await baseTransaction(admin, approveCall);

  const transactionPrepare = await server.prepareTransaction(transaction);
  transactionPrepare.sign(adminKeypair);

  const response = await server.sendTransaction(transactionPrepare);

  return response.hash;
};

export default buildApproveTransaction;
