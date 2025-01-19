import { RequestHandler } from 'express';

import Lockup from '../../models/Lockup';
import calculateLockupStatus from '../../utils/soroban/lockup/calculateLockupStatus';
import log from '../../logger';

const getLockupById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { network } = res;

    const lockup = await Lockup.findOne({ id, network }).populate('token').exec();

    if (!lockup) {
      return res.status(404).j({
        status: 'error',
        message: 'There is no lockup with this id',
        result: {},
      });
    }

    const lockupWithStatus = lockup.toObject();
    const status = calculateLockupStatus(lockup.start_date, lockup.end_date, lockup.cancelled_date);
    lockupWithStatus.status = status;

    return res.status(200).j({
      status: 'success',
      message: 'Get lockup by id',
      result: lockupWithStatus,
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
export default getLockupById;
