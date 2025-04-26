import log from '../logger';
import Ledger from '../models/Ledger';
import { Network } from '../types/networkType';

const updateLastLedger = async (lastUsedLedger: number, network: Network) => {
  const updateLastLedger = await Ledger.findOneAndUpdate(
    { id: network === 'testnet' ? '0' : '1' },
    { last: lastUsedLedger },
  );

  if (updateLastLedger) {
    log.info(`Update lastUsedLedger (Testnet) successful, ledger: ${lastUsedLedger}`);
  }

  if (!updateLastLedger) {
    const ledger = new Ledger({
      id: network === 'testnet' ? '0' : '1',
      last: lastUsedLedger,
    });
    await ledger.save();

    log.info(`Save lastUsedLedger (Testnet) successful, ledger: ${lastUsedLedger}`);
  }
};

export default updateLastLedger;
