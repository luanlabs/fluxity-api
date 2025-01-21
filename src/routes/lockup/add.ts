import { RequestHandler } from 'express';

import saveNewLockup from '../../event/saveNewLockup';
import log from '../../logger';

const addLockupRoute: RequestHandler = async (req, res) => {
  try {
    const { id } = req.body;
    const { network } = res;

    await saveNewLockup(id, network);

    return res.status(201).j({
      status: 'success',
      message: 'Save lockup to db',
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

export default addLockupRoute;
