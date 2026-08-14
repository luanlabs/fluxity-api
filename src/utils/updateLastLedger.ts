import log from '../logger';
import Ledger from '../models/Ledger';
import { Network } from '../types/networkType';

const updateLastLedger = async (lastUsedLedger: number, network: Network) => {
  const id = network === 'testnet' ? '0' : '1';

  await Ledger.findOneAndUpdate({ id }, { last: String(lastUsedLedger) }, { upsert: true });

  log.info(`Updated lastUsedLedger (${network}) successfully, ledger: ${lastUsedLedger}`);
};

export default updateLastLedger;
