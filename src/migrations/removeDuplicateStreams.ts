import Stream, { IStream } from '../models/Stream';

const removeDuplicateStreams = async (streams: IStream[]) => {
  const x = streams.reduce((prev, curr) => {
    if (curr.updatedAt > prev.updatedAt) {
      return curr;
    }

    return prev;
  }, streams[0]);

  await Stream.deleteMany({ _id: { $ne: x._id }, id: x.id });
};

export default removeDuplicateStreams;
