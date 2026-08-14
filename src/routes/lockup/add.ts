import { RequestHandler } from 'express';

import saveNewLockup from '../../event/saveNewLockup';
import log from '../../logger';
import getErrorMessage from '../../utils/getErrorMessage';
import { normalizeLockupId } from '../../utils/validation';

const addLockupRoute: RequestHandler = async (req, res) => {
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

    const saved = await saveNewLockup(id, network);

    if (!saved) {
      return res.status(500).j({
        status: 'error',
        message: 'Failed to save the lockup',
        result: {},
      });
    }

    return res.status(201).j({
      status: 'success',
      message: 'Save lockup to db',
      result: {},
    });
  } catch (error) {
    log.error(`Failed to add lockup: ${getErrorMessage(error)}`);

    return res.status(500).j({
      status: 'error',
      message: 'Failed to save the lockup',
      result: {},
    });
  }
};

export default addLockupRoute;
