import Lockup from '../models/Lockup';
import getLockup from '../utils/soroban/lockup/getLockup';

import saveNewLockup from './saveNewLockup';
import log from '../logger';
import getConfig from '../utils/soroban/getConfig';
import { Network } from '../types/networkType';
import getErrorMessage from '../utils/getErrorMessage';

const saveLockupCancelled = async (id: string, network: Network) => {
  try {
    const { contract, admin } = await getConfig(network);
    const lockup = await getLockup(admin, contract, id, network);

    const updatedLockup = await Lockup.findOneAndUpdate(
      { id, network },
      {
        is_cancelled: lockup.is_cancelled,
        withdrawn: lockup.withdrawn,
        cancelled_date: Number(lockup.cancelled_date),
      },
    );

    if (!updatedLockup) {
      // Cancellation arrived before the lockup was mirrored — create it now.
      await saveNewLockup(id, network);
    } else {
      log.info(`Saved cancelled lockup successfully, lockup: ${updatedLockup.id}`);
    }

    return true;
  } catch (error) {
    log.error(`Failed to save cancelled lockup ${id} on ${network}: ${getErrorMessage(error)}`);

    return false;
  }
};

export default saveLockupCancelled;
