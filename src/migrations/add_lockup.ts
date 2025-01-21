import { Networks } from '../constant/network';
import saveNewLockup from '../event/saveNewLockup';
import log from '../logger';
import Lockup from '../models/Lockup';
import getLatestLockupId from '../utils/soroban/lockup/getLatestLockupId';

async function lockupUp() {
  const latestLockupId = await getLatestLockupId(Networks.Testnet);

  let isMigration = false;

  for (let i = 0; i < latestLockupId; i++) {
    const lockups = await Lockup.findOne({ id: i, network: Networks.Testnet });

    if (!lockups) {
      saveNewLockup(i.toString(), Networks.Testnet);
      isMigration = true;
    }
  }

  if (isMigration) {
    log.info('Migration lockup applied successfully');
  }
}

export default lockupUp;
