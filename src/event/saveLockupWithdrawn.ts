import getLockup from '../utils/soroban/lockup/getLockup';
import Lockup from '../models/Lockup';
import bigintValuesToNumbers from '../utils/soroban/lockup/bigintValuesToNumbers';
import saveNewLockup from './saveNewLockup';
import log from '../logger';
import getConfig from '../utils/soroban/getConfig';
import { Network } from '../types/networkType';

const saveLockupWithdrawn = async (id: string, network: Network) => {
  try {
    const { contract, admin } = await getConfig(network);
    const lockup = await getLockup(admin, contract, id, network);
    const lockupDetails = bigintValuesToNumbers(lockup);

    const updateLockup = await Lockup.findOneAndUpdate(
      { id, network },
      { withdrawn: lockupDetails.withdrawn },
    );

    log.info(
      `Save withdrawn lockup successful, lockup: ${updateLockup?.id}, newWithdrawn:${lockupDetails.withdrawn}`,
    );

    if (!updateLockup) {
      await saveNewLockup(id, network);
    }

    return true;
  } catch (e) {
    log.error(e.message);

    return false;
  }
};

export default saveLockupWithdrawn;
