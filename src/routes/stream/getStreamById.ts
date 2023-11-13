import { RequestHandler } from 'express';

import Stream from '../../models/Stream';

const getStreamById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const stream = await Stream.findOne({ id_stream: id });
  if (!stream) {
    return res.status(404).j({
      status: 'error',
      message: 'There is no stream with this id',
      result: {},
    });
  }

  return res.status(200).j({
    status: 'success',
    message: 'Get stream by id',
    result: stream,
  });
};
export default getStreamById;
