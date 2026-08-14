import { Networks } from '../constant/network';
import saveNewLockup from '../event/saveNewLockup';
import log from '../logger';
import Lockup from '../models/Lockup';
import getLatestLockupId from '../utils/soroban/lockup/getLatestLockupId';

async function lockupUp() {
  const latestLockupId = Number(await getLatestLockupId(Networks.Testnet));

  let applied = 0;

  // Serialized on purpose: firing every save concurrently floods the Soroban RPC.
  for (let i = 0; i < latestLockupId; i++) {
    const id = String(i);
    const existing = await Lockup.findOne({ id, network: Networks.Testnet });

    if (!existing) {
      await saveNewLockup(id, Networks.Testnet);
      applied++;
    }
  }

  if (applied > 0) {
    log.info(`Migration applied successfully, added ${applied} lockup(s)`);
  }
}

export default lockupUp;
