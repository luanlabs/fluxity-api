import { Request, Response } from 'express';
import Subscriber from '../../models/Subscriber';
import { validateEmail } from '../../utils/validateEmail';

const addSubscriber = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        // Check if email is provided
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Use utility function to validate email if moved to utils
        if (!validateEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Check if email is already registered
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({ message: "Email is already subscribed." });
        }

        // Create a new subscriber
        const newSubscriber = new Subscriber({ email });

        // Save the subscriber to the database
        const savedSubscriber = await newSubscriber.save();
        
        res.status(201).json(savedSubscriber);
    } catch (error) {
        res.status(500).json({ message: "Error adding subscriber", error });
    }
};

export default addSubscriber;
