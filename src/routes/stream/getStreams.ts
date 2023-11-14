import { RequestHandler } from 'express';

import Stream from '../../models/Stream';
import createQuery from '../../utils/soroban/stream/createQuery';
import calculateStreamStatus from '../../utils/soroban/stream/calculateStreamStatus';

const getStreamsRoute: RequestHandler = async (req, res) => {
  const { status } = req.query;

  const query = createQuery(req.query);

  let streams = await Stream.find(query);

  if (streams) {
    for (let i = 0; i < streams.length; i++) {
      streams[i].status = calculateStreamStatus(streams[i].start_date, streams[i].end_date);
    }
  }

  if (status) {
    streams = streams.filter((stream) => {
      return stream.status === status;
    });
  }

  return res.status(200).j({
    status: 'success',
    message: '',
    result: streams,
  });
};
export default getStreamsRoute;
