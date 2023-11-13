import getServer from '../utils/soroban/getServer';
import getEventsServer from './fetch';
import ToScVal from '../utils/soroban/scVal';
import getStreamAndSave from './getStream';

const getEvents = async () => {
  try {
    const server = getServer();
    let lastUsedLedger = 0;
    setInterval(async () => {
      if (lastUsedLedger === 0) {
        const { sequence } = await server.getLatestLedger();
        lastUsedLedger = sequence - 6;
      }

      const contract = String(process.env.CONTRACT_ID);
      const stream = ToScVal.base64('STREAM');
      const created = ToScVal.base64('CREATED');

      const events = await getEventsServer({
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
          const idStream = ToScVal.native(eventsXdr[i].value.xdr);
          await getStreamAndSave(idStream);
        }
      }

      lastUsedLedger = events.result.latestLedger;
    }, 15000);

    return;
  } catch (e) {
    return console.log(e);
  }
};
export default getEvents;
