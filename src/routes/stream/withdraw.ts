import { RequestHandler } from 'express';

import saveStreamWithdrawn from '../../event/saveStreamWithdrawn';
import log from '../../logger';

const withdrawStreamRoute: RequestHandler = async (req, res) => {
  try {
    const { id } = req.body;
    const { network } = res;

    await saveStreamWithdrawn(id, network);

    return res.status(200).j({
      status: 'success',
      message: 'Successfully saved the stream on the DB',
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

export default withdrawStreamRoute;
