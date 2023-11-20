import { Schema, model } from 'mongoose';

export enum Status {
  Pending = 'pending',
  Ongoing = 'ongoing',
  Expired = 'expired',
}
enum Rate {
  Daily = 86400,
  Weekly = 604800,
  Monthly = 2592000,
  Quarterly = 10368000,
  Annually = 31536000,
}

export interface IStream {
  _id: string;
  amount: string;
  cancellable_date: number;
  cliff_date: number;
  end_date: number;
  is_cancelled: boolean;
  is_vesting: boolean;
  rate: Rate;
  receiver: string;
  sender: string;
  start_date: number;
  token: Schema.Types.ObjectId;
  withdrawn: string;
  status?: string;
}

const Stream = new Schema<IStream>(
  {
    _id: { type: String, required: true, unique: true },
    amount: { type: String, required: true },
    cancellable_date: { type: Number, required: true },
    cliff_date: { type: Number, required: true },
    end_date: { type: Number, required: true },
    is_cancelled: { type: Boolean, required: true },
    is_vesting: { type: Boolean, required: true },
    rate: { type: Number, required: true },
    receiver: { type: String, required: true },
    sender: { type: String, required: true },
    start_date: { type: Number, required: true },
    token: { type: Schema.Types.ObjectId, ref: 'Token', required: true },
    withdrawn: { type: String, required: true },
  },
  { timestamps: true },
);

export default model<IStream>('Stream', Stream);
