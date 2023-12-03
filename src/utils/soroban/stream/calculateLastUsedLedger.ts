import Ledger from '../../../models/Ledger';

const calculateLastUsedLedger = async (sequence: number) => {
  const lastSavedLedger = await Ledger.findOne({ id: '0' });

  if (!lastSavedLedger) {
    return sequence - 6;
  }

  return Number(lastSavedLedger.last);
};

export default calculateLastUsedLedger;
