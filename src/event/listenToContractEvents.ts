import log from '../logger';
import saveNewLockup from './saveNewLockup';
import ToScVal from '../utils/soroban/scVal';
import { Network } from '../types/networkType';
import getConfig from '../utils/soroban/getConfig';
import saveLockupCancelled from './saveLockupCancelled';
import saveLockupWithdrawn from './saveLockupWithdrawn';
import updateLastLedger from '../utils/updateLastLedger';
import calculateLastUsedLedger from '../utils/soroban/lockup/calculateLastUsedLedger';
import getErrorMessage from '../utils/getErrorMessage';

const POLL_INTERVAL_MS = 10_000;
const EVENTS_LIMIT = 1440;

/**
 * Continuously polls the Soroban RPC for lockup contract events and mirrors them
 * into the database. Runs as a single long-lived loop (not recursion) so the call
 * stack stays flat, and isolates every iteration in try/catch so a transient RPC
 * failure only skips one poll instead of killing the listener.
 */
const listenToContractEvents = async (network: Network) => {
  const lockup = ToScVal.toXDR('LOCKUP');
  const created = ToScVal.toXDR('CREATED');
  const cancelled = ToScVal.toXDR('CANCELLED');
  const withdrawn = ToScVal.toXDR('WITHDRAWN');

  for (;;) {
    try {
      const { server, contract } = await getConfig(network);

      const { sequence } = await server.getLatestLedger();
      const startLedger = await calculateLastUsedLedger(sequence);

      const responseGetEvents = await server.getEvents({
        startLedger,
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
        limit: EVENTS_LIMIT,
      });

      const events = responseGetEvents.events;

      if (events.length > 0) {
        let allSaved = true;

        for (const event of events) {
          const lockupId = ToScVal.fromXDR(event.value.toXDR('base64'));
          const topic = event.topic[1].toXDR('base64');

          let saved: boolean | undefined = false;

          if (topic === created) {
            saved = await saveNewLockup(lockupId, network);
          } else if (topic === withdrawn) {
            saved = await saveLockupWithdrawn(lockupId, network);
          } else if (topic === cancelled) {
            saved = await saveLockupCancelled(lockupId, network);
          }

          if (!saved) {
            allSaved = false;
          }
        }

        if (allSaved) {
          await updateLastLedger(responseGetEvents.latestLedger, network);
        }
      }
    } catch (error) {
      log.error(`Event listener error (${network}): ${getErrorMessage(error)}`);
    }

    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
  }
};

export default listenToContractEvents;
