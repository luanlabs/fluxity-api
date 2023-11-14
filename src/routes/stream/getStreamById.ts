import { RequestHandler } from 'express';

import Stream from '../../models/Stream';
import calculateStreamStatus from '../../utils/soroban/stream/calculateStreamStatus';

const getStreamById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const stream = await Stream.findOne({ _id: id });

  if (stream) {
    const status = calculateStreamStatus(stream.start_date, stream.end_date);
    stream.status = status;
  }

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
