import { RequestHandler } from 'express';
import saveStreamWithdrawn from '../../event/saveStreamWithdrawn';

const withdrawnStream: RequestHandler = async (req, res) => {
  try {
    const { id } = req.body;

    await saveStreamWithdrawn(id);

    return res.status(200).j({
      status: 'success',
      message: 'Change withdrawn stream to db',
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

export default withdrawnStream;
