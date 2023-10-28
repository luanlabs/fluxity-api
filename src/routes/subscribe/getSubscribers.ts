import { RequestHandler } from 'express';

import responseTemplate from '../../utils/responseTemplate';
import Subscriber from '../../models/Subscriber';

const getSubscribers: RequestHandler = async (req , res) => {
    try {
        const subscribers = await Subscriber.find();
        res.status(200).json(
            responseTemplate({
                status: 'success',
                message: 'Subscribers found successfully',
                result: subscribers,
            }),
        );
    } catch (error) {
        res.status(500).json(
            responseTemplate({
                status: 'error',
                message: 'Unble to fetch subscribers',
                result: {},
            }),
        );
    }
};

export default getSubscribers;
