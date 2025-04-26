import log from '../logger';
import saveNewLockup from './saveNewLockup';
import ToScVal from '../utils/soroban/scVal';
import { Network } from '../types/networkType';
import getConfig from '../utils/soroban/getConfig';
import saveLockupCancelled from './saveLockupCancelled';
import saveLockupWithdrawn from './saveLockupWithdrawn';
import updateLastLedger from '../utils/updateLastLedger';
import calculateLastUsedLedger from '../utils/soroban/lockup/calculateLastUsedLedger';

const listenToContrcatEvents = async (network: Network) => {
  try {
    const { server, contract } = await getConfig(network);

    let lastUsedLedger = 0;

    if (lastUsedLedger === 0) {
      const { sequence } = await server.getLatestLedger();
      lastUsedLedger = await calculateLastUsedLedger(sequence);
    }

    const lockup = ToScVal.toXDR('LOCKUP');
    const created = ToScVal.toXDR('CREATED');
    const cancelled = ToScVal.toXDR('CANCELLED');
    const withdrawn = ToScVal.toXDR('WITHDRAWN');

    const responseGetEvents = await server.getEvents({
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
      limit: 1440,
    });

    const events = responseGetEvents.events;

    if (events.length != 0) {
      let isUpdateUsedLedger: boolean = true;

      for (let i = 0; i < events.length; ++i) {
        const lockupId = ToScVal.fromXDR(events[i].value.toXDR('base64'));

        let isSavedDetails: boolean | undefined = false;

        const topic = events[i].topic[1].toXDR('base64');

        if (topic === created) {
          isSavedDetails = await saveNewLockup(lockupId, network);
        } else if (topic === withdrawn) {
          isSavedDetails = await saveLockupWithdrawn(lockupId, network);
        } else if (topic === cancelled) {
          isSavedDetails = await saveLockupCancelled(lockupId, network);
        }

        if (!isSavedDetails) {
          isUpdateUsedLedger = false;
        }
      }

      if (isUpdateUsedLedger) {
        lastUsedLedger = responseGetEvents.latestLedger;

        await updateLastLedger(lastUsedLedger, network);
      }
    }
  } catch (e) {
    log.error(e.message);
  }

  await new Promise((resolve) => setTimeout(resolve, 10000));
  listenToContrcatEvents(network);
};

export default listenToContrcatEvents;
