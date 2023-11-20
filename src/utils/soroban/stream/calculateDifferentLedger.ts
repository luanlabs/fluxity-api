import Ledger from '../../../models/Ledger';

const calculateDifferentLedger = async (sequence: number) => {
  const lastSavedLedger = await Ledger.findOne({ _id: '0' });

  if (!lastSavedLedger) {
    return 6;
  }

  const differentLedger = sequence - Number(lastSavedLedger?.last);
  return differentLedger;
};

export default calculateDifferentLedger;
