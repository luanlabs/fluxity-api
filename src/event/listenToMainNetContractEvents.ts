import getEvents from './getEvents';
import Ledger from '../models/Ledger';
import saveNewLockup from './saveNewLockup';
import ToScVal from '../utils/soroban/scVal';
import saveLockupWithdrawn from './saveLockupWithdrawn';
import saveLockupCancelled from './saveLockupCancelled';
import calculateLastUsedLedger from '../utils/soroban/lockup/calculateLastUsedLedger';
import log from '../logger';
import getConfig from '../utils/soroban/getConfig';
import { Networks } from '../constant/network';

const listenToMainNetContractEvents = async () => {
  try {
    const { server, contract } = await getConfig(Networks.Mainnet);

    let lastUsedLedger = 0;

    if (lastUsedLedger === 0) {
      const { sequence } = await server.getLatestLedger();
      lastUsedLedger = await calculateLastUsedLedger(sequence);
    }

    const lockup = ToScVal.toXDR('LOCKUP');
    const created = ToScVal.toXDR('CREATED');
    const cancelled = ToScVal.toXDR('CANCELLED');
    const withdrawn = ToScVal.toXDR('WITHDRAWN');

    const events = await getEvents(
      {
        startLedger: lastUsedLedger,
        filters: [
          {
            type: 'contract',
            contractIds: [contract.address().toString()],
            topics: [
              [lockup, created],
              [lockup, cancelled],
              [lockup, withdrawn],
            ],
          },
        ],
        pagination: {
          limit: 1440,
        },
      },
      Networks.Mainnet,
    );

    if (events) {
      const eventsXdr = events.result.events;

      for (let i = 0; i < events.result.events.length; ++i) {
        const lockupId = ToScVal.fromXDR(eventsXdr[i].value);

        if (eventsXdr[i].topic[1] === created) {
          await saveNewLockup(lockupId, Networks.Mainnet);
        } else if (eventsXdr[i].topic[1] === withdrawn) {
          await saveLockupWithdrawn(lockupId, Networks.Mainnet);
        } else if (eventsXdr[i].topic[1] === cancelled) {
          await saveLockupCancelled(lockupId, Networks.Mainnet);
        }
      }

      lastUsedLedger = events.result.latestLedger;

      const updateLastLedger = await Ledger.findOneAndUpdate({ id: '1' }, { last: lastUsedLedger });

      if (updateLastLedger) {
        log.info(`Update lastUsedLedger (Mainnet) successful, ledger: ${lastUsedLedger}`);
      }

      if (!updateLastLedger) {
        const ledger = new Ledger({
          id: '1',
          last: lastUsedLedger,
        });
        await ledger.save();

        log.info(`Save lastUsedLedger (Mainnet) successful, ledger: ${lastUsedLedger}`);
      }
    }
  } catch (e) {
    log.error(e.message);
  }

  await new Promise((resolve) => setTimeout(resolve, 15000));
  listenToMainNetContractEvents();
};
export default listenToMainNetContractEvents;
