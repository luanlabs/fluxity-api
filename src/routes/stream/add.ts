import { RequestHandler } from 'express';

import saveNewStream from '../../event/saveNewStream';
import log from '../../logger';

const addStreamRoute: RequestHandler = async (req, res) => {
  try {
    const { id } = req.body;
    const { network } = res;

    await saveNewStream(id, network);

    return res.status(201).j({
      status: 'success',
      message: 'Save stream to db',
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

export default addStreamRoute;
