import { RequestHandler } from 'express';

import saveLockupWithdrawn from '../../event/saveLockupWithdrawn';
import log from '../../logger';

const withdrawLockupRoute: RequestHandler = async (req, res) => {
  try {
    const { id } = req.body;
    const { network } = res;

    await saveLockupWithdrawn(id, network);

    return res.status(200).j({
      status: 'success',
      message: 'Successfully saved the lockup on the DB',
      result: {},
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

export default withdrawLockupRoute;
