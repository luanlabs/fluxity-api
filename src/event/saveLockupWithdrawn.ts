import getLockup from '../utils/soroban/lockup/getLockup';
import Lockup from '../models/Lockup';
import bigintValuesToNumbers from '../utils/soroban/lockup/bigintValuesToNumbers';
import saveNewLockup from './saveNewLockup';
import log from '../logger';
import getConfig from '../utils/soroban/getConfig';
import { Network } from '../types/networkType';
import getErrorMessage from '../utils/getErrorMessage';

const saveLockupWithdrawn = async (id: string, network: Network) => {
  try {
    const { contract, admin } = await getConfig(network);
    const lockup = await getLockup(admin, contract, id, network);
    const lockupDetails = bigintValuesToNumbers(lockup);

    const updatedLockup = await Lockup.findOneAndUpdate(
      { id, network },
      { withdrawn: lockupDetails.withdrawn },
    );

    if (!updatedLockup) {
      // Withdrawal arrived before the lockup was mirrored — create it now.
      await saveNewLockup(id, network);
    } else {
      log.info(
        `Saved withdrawn lockup successfully, lockup: ${updatedLockup.id}, newWithdrawn: ${lockupDetails.withdrawn}`,
      );
    }

    return true;
  } catch (error) {
    log.error(`Failed to save withdrawn lockup ${id} on ${network}: ${getErrorMessage(error)}`);

    return false;
  }
};

export default saveLockupWithdrawn;
