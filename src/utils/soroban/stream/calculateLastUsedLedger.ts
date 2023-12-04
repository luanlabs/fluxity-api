import Ledger from '../../../models/Ledger';

const calculateLastUsedLedger = async (sequence: number) => {
  const lastSavedLedger = await Ledger.findOne({ id: '0' });

  if (!lastSavedLedger) {
    return sequence - 6;
  }

  const oldLedger = sequence - 1440;

  if (Number(lastSavedLedger.last) <= oldLedger) {
    return sequence - 1438;
  }

  return Number(lastSavedLedger.last);
};

export default calculateLastUsedLedger;
