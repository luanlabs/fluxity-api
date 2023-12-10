import { RequestHandler } from 'express';

import Stream from '../../models/Stream';
import getStreamsQueries from '../../utils/soroban/stream/getStreamsQueries';
import calculateStreamStatus from '../../utils/soroban/stream/calculateStreamStatus';
import log from '../../logger';

const getStreamsRoute: RequestHandler = async (req, res) => {
  try {
    const { status } = req.query;

    const query = getStreamsQueries(req.query);

    const streamAll = await Stream.find(query).populate('token').exec();

    let streams = streamAll.map((stream) => stream.toObject());

    for (let i = 0; i < streams.length; i++) {
      streams[i].status = calculateStreamStatus(streams[i].start_date, streams[i].end_date);
    }

    if (status) {
      streams = streams.filter((stream) => {
        return stream.status === status.toString().toLowerCase();
      });
    }

    return res.status(200).j({
      status: 'success',
      message: '',
      result: streams,
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
export default getStreamsRoute;
