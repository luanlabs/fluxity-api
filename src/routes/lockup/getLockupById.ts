import { RequestHandler } from 'express';

import Lockup from '../../models/Lockup';
import calculateLockupStatus from '../../utils/soroban/lockup/calculateLockupStatus';
import log from '../../logger';
import getErrorMessage from '../../utils/getErrorMessage';
import { normalizeLockupId } from '../../utils/validation';

const getLockupById: RequestHandler = async (req, res) => {
  try {
    const { network } = res;
    const id = normalizeLockupId(req.params.id);

    if (id === null) {
      return res.status(400).j({
        status: 'error',
        message: 'A valid lockup id is required',
        result: {},
      });
    }

    const lockup = await Lockup.findOne({ id, network }).populate('token').exec();

    if (!lockup) {
      return res.status(404).j({
        status: 'error',
        message: 'There is no lockup with this id',
        result: {},
      });
    }

    const lockupWithStatus = lockup.toObject();
    lockupWithStatus.status = calculateLockupStatus(
      lockup.start_date,
      lockup.end_date,
      lockup.cancelled_date,
    );

    return res.status(200).j({
      status: 'success',
      message: 'Get lockup by id',
      result: lockupWithStatus,
    });
  } catch (error) {
    log.error(`Failed to fetch lockup: ${getErrorMessage(error)}`);

    return res.status(500).j({
      status: 'error',
      message: 'Failed to fetch lockup',
      result: {},
    });
  }
};

export default getLockupById;
