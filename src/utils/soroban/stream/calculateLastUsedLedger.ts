import Ledger from '../../../models/Ledger';
import getServer from '../getServer';

const calculateLastUsedLedger = async (sequence: number) => {
  const lastSavedLedger = await Ledger.findOne({ _id: '0' });

  if (!lastSavedLedger) {
    return sequence - 6;
  }

  const server = getServer();
  const oldLedger = await server.getTransaction(
    'c4515e3bdc0897f21cc5dbec8c82cf0a936d4741cb74a8e158eb51b9fb00411a',
  );

  if (Number(lastSavedLedger.last) <= Number(oldLedger.oldestLedger)) {
    return sequence - 6;
  }

  return Number(lastSavedLedger.last);
};

export default calculateLastUsedLedger;
