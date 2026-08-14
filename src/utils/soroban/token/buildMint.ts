import { Account, Contract } from '@stellar/stellar-sdk';

import ToScVal from '../scVal';
import envs from '../../../env';
import baseTransaction from '../baseTransaction';
import getConfig from '../getConfig';
import { Networks } from '../../../constant/network';

const buildMintTransaction = async (
  admin: Account,
  token: string,
  toAddress: string,
): Promise<string> => {
  const { server, adminKeypair, networkPassphrase } = await getConfig(Networks.Testnet);
  const { CLAIM_TOKEN_AMOUNT } = envs();

  const contract = new Contract(token);

  const address = ToScVal.address(toAddress);

  const mintCall = contract.call('mint', address, ToScVal.i128(BigInt(CLAIM_TOKEN_AMOUNT)));

  const transaction = baseTransaction(admin, mintCall, networkPassphrase);

  const transactionPrepare = await server.prepareTransaction(transaction);

  transactionPrepare.sign(adminKeypair);

  const response = await server.sendTransaction(transactionPrepare);

  if (response.status === 'ERROR') {
    throw new Error(`Failed to submit mint transaction for token ${token}`);
  }

  return response.hash;
};

export default buildMintTransaction;
