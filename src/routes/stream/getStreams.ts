import { RequestHandler } from 'express';

import Stream from '../../models/Stream';

const getStreamsRoute: RequestHandler = async (req, res) => {
  const streams = await Stream.find();

  return res.status(200).j({
    status: 'success',
    message: '',
    result: streams,
  });
};
export default getStreamsRoute;
