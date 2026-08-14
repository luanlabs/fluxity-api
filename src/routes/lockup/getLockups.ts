import { RequestHandler } from 'express';

import Lockup from '../../models/Lockup';
import getLockupsQueries from '../../utils/soroban/lockup/getLockupsQueries';
import calculateLockupStatus from '../../utils/soroban/lockup/calculateLockupStatus';
import log from '../../logger';
import getErrorMessage from '../../utils/getErrorMessage';

const getLockupsRoute: RequestHandler = async (req, res) => {
  try {
    const { status } = req.query;
    const { network } = res;

    const query = getLockupsQueries(req.query, network);

    const lockupAll = await Lockup.find(query).populate('token').sort({ start_date: -1 }).exec();

    let lockups = lockupAll.map((lockup) => {
      const plain = lockup.toObject();
      plain.status = calculateLockupStatus(plain.start_date, plain.end_date, plain.cancelled_date);
      return plain;
    });

    if (status) {
      const wanted = status.toString().toLowerCase();
      lockups = lockups.filter((lockup) => lockup.status === wanted);
    }

    return res.status(200).j({
      status: 'success',
      message: 'Lockups have been successfully found',
      result: lockups,
    });
  } catch (error) {
    log.error(`Failed to fetch lockups: ${getErrorMessage(error)}`);

    return res.status(500).j({
      status: 'error',
      message: 'Failed to fetch lockups',
      result: {},
    });
  }
};

export default getLockupsRoute;
