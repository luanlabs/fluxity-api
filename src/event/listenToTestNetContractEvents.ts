import getEvents from './getEvents';
import Ledger from '../models/Ledger';
import saveNewStream from './saveNewStream';
import ToScVal from '../utils/soroban/scVal';
import saveStreamWithdrawn from './saveStreamWithdrawn';
import saveStreamCancelled from './saveStreamCancelled';
import calculateLastUsedLedger from '../utils/soroban/stream/calculateLastUsedLedger';
import log from '../logger';
import getConfig from '../utils/soroban/getConfig';
import { Networks } from '../constant/network';

const listenToTestNetContractEvents = async () => {
  try {
    const { server, contract } = await getConfig(Networks.Testnet);
    let lastUsedLedger = 0;

    if (lastUsedLedger === 0) {
      const { sequence } = await server.getLatestLedger();
      lastUsedLedger = await calculateLastUsedLedger(sequence);
    }

    const stream = ToScVal.toXDR('STREAM');
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
              [stream, created],
              [stream, cancelled],
              [stream, withdrawn],
            ],
          },
        ],
        pagination: {
          limit: 1440,
        },
      },
      Networks.Testnet,
    );

    if (events) {
      const eventsXdr = events.result.events;

      for (let i = 0; i < events.result.events.length; ++i) {
        const streamId = ToScVal.fromXDR(eventsXdr[i].value);

        if (eventsXdr[i].topic[1] === created) {
          await saveNewStream(streamId, Networks.Testnet);
        } else if (eventsXdr[i].topic[1] === withdrawn) {
          await saveStreamWithdrawn(streamId, Networks.Testnet);
        } else if (eventsXdr[i].topic[1] === cancelled) {
          await saveStreamCancelled(streamId, Networks.Testnet);
        }
      }

      lastUsedLedger = events.result.latestLedger;

      const updateLastLedger = await Ledger.findOneAndUpdate({ id: '0' }, { last: lastUsedLedger });

      log.info({ message: 'Update lastUsedLedger successful', value: updateLastLedger });

      if (!updateLastLedger) {
        const ledger = new Ledger({
          id: '0',
          last: lastUsedLedger,
        });
        await ledger.save();

        log.info({ message: 'Save lastUsedLedger successful', value: ledger });
      }
    }
  } catch (e) {
    log.error({ message: e.message });
  }
  await new Promise((resolve) => setTimeout(resolve, 15000));
  listenToTestNetContractEvents();
};
export default listenToTestNetContractEvents;
