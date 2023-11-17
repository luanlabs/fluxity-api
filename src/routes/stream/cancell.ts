import { RequestHandler } from 'express';
import saveStreamCancelled from '../../event/saveStreamCancelled';

const cancellStream: RequestHandler = async (req, res) => {
  try {
    const { id } = req.body;

    await saveStreamCancelled(id);

    return res.status(200).j({
      status: 'success',
      message: 'Change cancelled stream to db',
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

export default cancellStream;
