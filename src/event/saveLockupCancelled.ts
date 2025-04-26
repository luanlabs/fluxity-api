import Lockup from '../models/Lockup';
import getLockup from '../utils/soroban/lockup/getLockup';

import saveNewLockup from './saveNewLockup';
import log from '../logger';
import getConfig from '../utils/soroban/getConfig';
import { Network } from '../types/networkType';

const saveLockupCancelled = async (id: string, network: Network) => {
  try {
    const { contract, admin } = await getConfig(network);
    const lockup = await getLockup(admin, contract, id, network);

    const updateLockup = await Lockup.findOneAndUpdate(
      { id, network },
      {
        is_cancelled: lockup.is_cancelled,
        withdrawn: lockup.withdrawn,
        cancelled_date: Number(lockup.cancelled_date),
      },
    );

    log.info(`Save cancell lockup successful, lockup: ${updateLockup?.id}`);

    if (!updateLockup) {
      await saveNewLockup(id, network);
    }

    return true;
  } catch (e) {
    log.error(e.message);

    return false;
  }
};

export default saveLockupCancelled;
