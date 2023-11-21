import { RequestHandler } from 'express';

import Stream from '../../models/Stream';
import calculateStreamStatus from '../../utils/soroban/stream/calculateStreamStatus';

const getStreamById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const stream = await Stream.findOne({ _id: id }).populate('token').exec();

    if (!stream) {
      return res.status(404).j({
        status: 'error',
        message: 'There is no stream with this id',
        result: {},
      });
    }

    const streamWithStatus = stream.toObject();
    const status = calculateStreamStatus(stream.start_date, stream.end_date);
    streamWithStatus.status = status;

    return res.status(200).j({
      status: 'success',
      message: 'Get stream by id',
      result: streamWithStatus,
    });
  } catch (e) {
    return res.status(500).j({
      status: 'error',
      message: e.message,
      result: {},
    });
  }
};
export default getStreamById;
