import mongoose, { Document, Schema } from 'mongoose';

interface ISubscriber extends Document {
    email: string;
    dateSubscribed: Date;
}

const subscriberSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    dateSubscribed: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const Subscriber = mongoose.model<ISubscriber>('Subscriber', subscriberSchema);

export default Subscriber;