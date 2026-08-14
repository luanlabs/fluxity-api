import { RequestHandler } from 'express';

import saveLockupCancelled from '../../event/saveLockupCancelled';
import log from '../../logger';
import getErrorMessage from '../../utils/getErrorMessage';
import { normalizeLockupId } from '../../utils/validation';

const cancelLockupRoute: RequestHandler = async (req, res) => {
  try {
    const { network } = res;
    const id = normalizeLockupId(req.body?.id);

    if (id === null) {
      return res.status(400).j({
        status: 'error',
        message: 'A valid lockup id is required',
        result: {},
      });
    }

    const saved = await saveLockupCancelled(id, network);

    if (!saved) {
      return res.status(500).j({
        status: 'error',
        message: 'Failed to save the cancelled lockup',
        result: {},
      });
    }

    return res.status(200).j({
      status: 'success',
      message: 'Successfully saved the cancelled lockup on the DB',
      result: {},
    });
  } catch (error) {
    log.error(`Failed to cancel lockup: ${getErrorMessage(error)}`);

    return res.status(500).j({
      status: 'error',
      message: 'Failed to save the cancelled lockup',
      result: {},
    });
  }
};

export default cancelLockupRoute;
