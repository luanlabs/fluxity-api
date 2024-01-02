import { RequestHandler } from 'express';

import saveStreamCancelled from '../../event/saveStreamCancelled';
import log from '../../logger';

const cancelStreamRoute: RequestHandler = async (req, res) => {
  try {
    const { id } = req.body;
    const network = req.originalUrl.split('/')[1];

    await saveStreamCancelled(id, network);

    return res.status(200).j({
      status: 'success',
      message: 'Successfully saved the cancelled stream on the DB',
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

export default cancelStreamRoute;
