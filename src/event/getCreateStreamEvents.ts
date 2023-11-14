import getServer from '../utils/soroban/getServer';
import getEvents from './getEvents';
import ToScVal from '../utils/soroban/scVal';
import saveNewStream from './saveStream';
import withdrawnStream from './withdrawnStream';
import cancelledStream from './cancelledStream';

const getCreateStreamEvents = async () => {
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

      console.log(events.result.events);

      const eventsXdr = events.result.events;

      if (eventsXdr.length > 0) {
        for (let i = 0; i < events.result.events.length; i++) {
          const idStream = ToScVal.fromXDR(eventsXdr[i].value.xdr);
          if (eventsXdr[i].topic[1] === created) {
            await saveNewStream(idStream);
          } else if (eventsXdr[i].topic[1] === withdrawn) {
            await withdrawnStream(idStream);
          } else if (eventsXdr[i].topic[1] === cancelled) {
            await cancelledStream(idStream);
          }
        }
      }

      lastUsedLedger = events.result.latestLedger;
    }, 15000);

    return;
  } catch (e) {
    return console.log(e);
  }
};
export default getCreateStreamEvents;
