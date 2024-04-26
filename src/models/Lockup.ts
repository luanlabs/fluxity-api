import mongoose, { Schema, model } from 'mongoose';

import { Network } from '../types/networkType';

export enum Status {
  Pending = 'pending',
  Ongoing = 'ongoing',
  Cancelled = 'cancelled',
  Completed = 'completed',
}
export enum Rate {
  Daily = 86400,
  Weekly = 604800,
  Monthly = 2592000,
  Quarterly = 10368000,
  Annually = 31536000,
}

export interface ICreateLockup {
  _id: mongoose.Types.ObjectId;
  id: string;
  amount: string;
  cancellable_date: number;
  cancelled_date: number;
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
  network: Network;
  createdAt: Date;
  updatedAt: Date;
}

const Lockup = new Schema<ICreateLockup>(
  {
    id: { type: String, required: true },
    amount: { type: String, required: true },
    cancellable_date: { type: Number, required: true },
    cancelled_date: { type: Number, required: true },
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
    network: { type: String, required: true },
  },
  { timestamps: true },
);

Lockup.index({ id: 1, network: 1 }, { unique: true });

export default model<ICreateLockup>('Lockup', Lockup);
