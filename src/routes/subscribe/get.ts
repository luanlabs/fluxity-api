import { RequestHandler } from 'express';

import Subscriber from '../../models/Subscriber';

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
    return res.status(500).j({
      status: 'error',
      message: error.message,
      result: {},
    });
  }
};

export default getSubscribers;
