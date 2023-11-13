import { RequestHandler } from 'express';
import Stream from '../../models/Stream';

const getStreams: RequestHandler = async (req, res) => {
  const stream = await Stream.find();
  if (!stream) {
    return res.status(404).j({
      status: 'error',
      message: 'There are no streams',
      result: {},
    });
  }

  return res.status(200).j({
    status: 'success',
    message: 'Get streams',
    result: stream,
  });
};
export default getStreams;
