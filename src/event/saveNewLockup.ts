import Token from '../models/Token';
import Lockup from '../models/Lockup';
import saveToken from '../utils/token/saveToken';
import getLockup from '../utils/soroban/lockup/getLockup';
import bigintValuesToNumbers from '../utils/soroban/lockup/bigintValuesToNumbers';
import log from '../logger';
import getConfig from '../utils/soroban/getConfig';
import { Network } from '../types/networkType';
import getErrorMessage from '../utils/getErrorMessage';

const saveNewLockup = async (id: string, network: Network) => {
  try {
    const { contract, admin } = await getConfig(network);

    const existingLockup = await Lockup.findOne({ id, network });

    if (existingLockup) {
      // Already mirrored — report success so the event cursor can advance.
      return true;
    }

    const lockup = await getLockup(admin, contract, id, network);
    const lockupDetails = bigintValuesToNumbers(lockup);

    let token = await Token.findOne({ address: lockupDetails.token, network });

    if (!token) {
      token = await saveToken(lockupDetails.token, network);
    }

    lockupDetails.id = id;
    lockupDetails.token = token._id;
    lockupDetails.network = network;

    const newLockup = new Lockup(lockupDetails);

    await newLockup.save();

    log.info(`Saved new lockup successfully, lockup: ${newLockup.id}`);

    return true;
  } catch (error) {
    log.error(`Failed to save new lockup ${id} on ${network}: ${getErrorMessage(error)}`);

    return false;
  }
};

export default saveNewLockup;
