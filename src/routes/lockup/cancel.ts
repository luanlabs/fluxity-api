import { RequestHandler } from 'express';

import saveLockupCancelled from '../../event/saveLockupCancelled';
import log from '../../logger';

const cancelLockupRoute: RequestHandler = async (req, res) => {
  try {
    const { id } = req.body;
    const { network } = res;

    await saveLockupCancelled(id, network);

    return res.status(200).j({
      status: 'success',
      message: 'Successfully saved the cancelled lockup on the DB',
      result: {},
    });
  } catch (e) {
    log.error({ message: e.message });
    return res.status(500).j({
      status: 'error',
      message: e.message,
      result: {},
    });
  }
};

export default cancelLockupRoute;
