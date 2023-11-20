import { RequestHandler } from 'express';

import saveStreamCancelled from '../../event/saveStreamCancelled';

const cancelStreamRoute: RequestHandler = async (req, res) => {
  try {
    const { id } = req.body;

    await saveStreamCancelled(id);

    return res.status(200).j({
      status: 'success',
      message: 'Successfully saved the cancelled stream on the DB',
      result: {},
    });
  } catch (e) {
    return res.status(500).j({
      status: 'error',
      message: e.message,
      result: {},
    });
  }
};

export default cancelStreamRoute;
