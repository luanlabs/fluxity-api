import { RequestHandler } from 'express';
import Stream from '../../models/Stream';

const getStreamFromId: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const stream = await Stream.findOne({ id_stream: id });
  if (!stream) {
    return res.status(404).j({
      status: 'error',
      message: 'There is no stream with this ID',
      result: {},
    });
  }
  console.log(stream);

  return res.status(200).j({
    status: 'success',
    message: 'Get stream from id',
    result: stream,
  });
};
export default getStreamFromId;
