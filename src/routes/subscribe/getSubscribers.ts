import { Request, Response } from 'express';
import Subscriber from '../../models/Subscriber';

const getSubscribers = async (req: Request, res: Response) => {
    try {
        const subscribers = await Subscriber.find();
        res.status(200).json(subscribers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching subscribers", error });
    }
};

export default getSubscribers;
