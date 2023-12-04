import getEvents from './getEvents';
import Ledger from '../models/Ledger';
import saveNewStream from './saveNewStream';
import ToScVal from '../utils/soroban/scVal';
import getServer from '../utils/soroban/getServer';
import saveStreamWithdrawn from './saveStreamWithdrawn';
import saveStreamCancelled from './saveStreamCancelled';
import calculateLastUsedLedger from '../utils/soroban/stream/calculateLastUsedLedger';

const listenToContractEvents = async () => {
  try {
    const server = getServer();

    let lastUsedLedger = 0;

    setInterval(async () => {
      if (lastUsedLedger === 0) {
        const { sequence } = await server.getLatestLedger();

        lastUsedLedger = await calculateLastUsedLedger(sequence);
      }

      const contract = String(process.env.CONTRACT_ID);

      const stream = ToScVal.toXDR('STREAM');
      const created = ToScVal.toXDR('CREATED');
      const cancelled = ToScVal.toXDR('CANCELLED');
      const withdrawn = ToScVal.toXDR('WITHDRAWN');

      const events = await getEvents({
        startLedger: lastUsedLedger.toString(),
        filters: [
          {
            type: 'contract',
            contractIds: [contract],
            topics: [
              [stream, created],
              [stream, cancelled],
              [stream, withdrawn],
            ],
          },
        ],
        pagination: {
          limit: 100,
        },
      });

      if (events) {
        const eventsXdr = events.result.events;

        for (let i = 0; i < events.result.events.length; ++i) {
          const streamId = ToScVal.fromXDR(eventsXdr[i].value.xdr);

          if (eventsXdr[i].topic[1] === created) {
            await saveNewStream(streamId);
          } else if (eventsXdr[i].topic[1] === withdrawn) {
            await saveStreamWithdrawn(streamId);
          } else if (eventsXdr[i].topic[1] === cancelled) {
            await saveStreamCancelled(streamId);
          }
        }

        lastUsedLedger = events.result.latestLedger;

        const updateLastLedger = await Ledger.findOneAndUpdate(
          { id: '0' },
          { last: lastUsedLedger },
        );

        if (!updateLastLedger) {
          const ledger = new Ledger({
            id: '0',
            last: lastUsedLedger,
          });
          await ledger.save();
        }
      }
    }, 15000);
  } catch (e) {}
};
export default listenToContractEvents;
