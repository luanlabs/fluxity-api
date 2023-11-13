import getServer from '../utils/soroban/getServer';
import getEvents from './getEvents';
import ToScVal from '../utils/soroban/scVal';
import saveNewStram from './getStream';

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

      const events = await getEvents({
        startLedger: lastUsedLedger.toString(),
        filters: [
          {
            type: 'contract',
            contractIds: [contract],
            topics: [[stream, created]],
          },
        ],
        pagination: {
          limit: 100,
        },
      });

      const eventsXdr = events.result.events;

      if (eventsXdr.length > 0) {
        for (let i = 0; i < events.result.events.length; i++) {
          const idStream = ToScVal.fromXDR(eventsXdr[i].value.xdr);
          await saveNewStram(idStream);
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
