import { RequestHandler } from 'express';

import Lockup from '../../models/Lockup';
import getLockupsQueries from '../../utils/soroban/lockup/getLockupsQueries';
import calculateLockupStatus from '../../utils/soroban/lockup/calculateLockupStatus';
import log from '../../logger';

const getLockupsRoute: RequestHandler = async (req, res) => {
  try {
    const { status } = req.query;
    const { network } = res;

    const query = getLockupsQueries(req.query, network);

    const lockupAll = await Lockup.find(query).populate('token').sort({ start_date: -1 }).exec();

    let lockups = lockupAll.map((lockup) => lockup.toObject());

    for (let i = 0; i < lockups.length; i++) {
      lockups[i].status = calculateLockupStatus(
        lockups[i].start_date,
        lockups[i].end_date,
        lockups[i].cancelled_date,
      );
    }

    if (status) {
      lockups = lockups.filter((lockup) => {
        return lockup.status === status.toString().toLowerCase();
      });
    }

    return res.status(200).j({
      status: 'success',
      message: '',
      result: lockups,
    });
  } catch (e) {
    log.error(e.message);

    return res.status(500).j({
      status: 'error',
      message: e.message,
      result: {},
    });
  }
};
export default getLockupsRoute;
