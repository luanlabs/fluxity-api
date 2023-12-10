import { RequestHandler } from 'express';

import Subscriber from '../../models/Subscriber';
import log from '../../logger';

const getSubscribers: RequestHandler = async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    return res.status(200).j({
      status: 'success',
      message: 'Subscribers found successfully',
      result: subscribers,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error) {
    log.error({ message: error.message });

    return res.status(500).j({
      status: 'error',
      message: error.message,
      result: {},
    });
  }
};

export default getSubscribers;
