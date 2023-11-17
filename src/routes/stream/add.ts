import { RequestHandler } from 'express';
import saveNewStream from '../../event/saveNewStream';

const addStream: RequestHandler = async (req, res) => {
  try {
    const { id } = req.body;

    await saveNewStream(id);

    return res.status(200).j({
      status: 'success',
      message: 'Save stream to db',
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

export default addStream;
