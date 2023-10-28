import { RequestHandler } from 'express';

import responseTemplate from '../../utils/responseTemplate';
import Subscriber from '../../models/Subscriber';
import { validateEmail } from '../../utils/validateEmail';

const addSubscriber: RequestHandler = async (req, res) => {
    try {
        const { email } = req.body.toLowerCase();

        // Check if email is provided
        if (!email) {
            return res.status(400).json(
                responseTemplate({
                    status: 'error',
                    message: 'No email provided',
                    result: {},
                }),
            );
        }

        // Check if the email is entered with the right format
        if (!validateEmail(email)) {
            return res.status(400).json(
                responseTemplate({ 
                    status: 'error',
                    message: 'Invalid email format',
                    result: {},
                }),
            );
        }

        // Check if email is already registered
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json(
                responseTemplate({
                    status: 'error',
                    message: 'Email already joined',
                    result: {},
                }),
            );
        }

        // Create a new subscriber
        const newSubscriber = new Subscriber({ email });

        // Save the subscriber to the database
        const savedSubscriber = await newSubscriber.save();
        
        return res.status(200).json(
            responseTemplate({
                status: 'success',
                message: 'Subscriber saved successfully',
                result: savedSubscriber,
            }),
        );
    } catch (error) {
        res.status(500).json(
            responseTemplate({ 
                status: 'error',
                message: 'Error adding subscriber',
                result: {}, 
            }),
        );
    }
};

export default addSubscriber;
