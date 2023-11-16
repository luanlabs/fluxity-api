import getServer from '../utils/soroban/getServer';
import getEvents from './getEvents';
import ToScVal from '../utils/soroban/scVal';
import saveNewStream from './saveNewStream';
import saveStreamWithdrawn from './saveStreamWithdrawn';
import cancelStream from './cancelStream';

const listenToContractEvents = async () => {
  try {
    const server = getServer();
    let lastUsedLedger = 0;
    setInterval(async () => {
      if (lastUsedLedger === 0) {
        const { sequence } = await server.getLatestLedger();
        lastUsedLedger = sequence - 6;
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

        for (let i = 0; i < events.result.events.length; i++) {
          const streamId = ToScVal.fromXDR(eventsXdr[i].value.xdr);

          if (eventsXdr[i].topic[1] === created) {
            await saveNewStream(streamId);
          } else if (eventsXdr[i].topic[1] === withdrawn) {
            await saveStreamWithdrawn(streamId);
          } else if (eventsXdr[i].topic[1] === cancelled) {
            await cancelStream(streamId);
          }
        }

        lastUsedLedger = events.result.latestLedger;
      }
    }, 15000);
  } catch (e) {}
};
export default listenToContractEvents;
