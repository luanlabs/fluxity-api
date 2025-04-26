import Token from '../models/Token';
import Lockup from '../models/Lockup';
import saveToken from '../utils/token/saveToken';
import getLockup from '../utils/soroban/lockup/getLockup';
import bigintValuesToNumbers from '../utils/soroban/lockup/bigintValuesToNumbers';
import log from '../logger';
import getConfig from '../utils/soroban/getConfig';
import { Network } from '../types/networkType';

const saveNewLockup = async (id: string, network: Network) => {
  try {
    const { contract, admin } = await getConfig(network);

    const existinglockup = await Lockup.findOne({ id, network });

    if (existinglockup) {
      return;
    }

    const lockup = await getLockup(admin, contract, id, network);
    const lockupDetails = bigintValuesToNumbers(lockup);

    let token = await Token.findOne({ address: lockupDetails.token });

    if (!token) {
      token = await saveToken(lockupDetails.token, network);
    }

    lockupDetails.id = id;
    lockupDetails.token = token._id;
    lockupDetails.network = network;

    const newLockup = new Lockup(lockupDetails);

    await newLockup.save();

    log.info(`Save new lockup successful, lockup: ${newLockup.id}`);

    return true;
  } catch (e) {
    log.error(e.message);

    return false;
  }
};

export default saveNewLockup;
