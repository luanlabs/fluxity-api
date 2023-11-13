import { Schema, model } from 'mongoose';

export interface IStream {
  id_stream: number;
  amount: number;
  cancellable_date: number;
  cliff_date: number;
  end_date: number;
  is_cancelled: boolean;
  is_vesting: boolean;
  rate: number;
  receiver: string;
  sender: string;
  start_date: number;
  token: string;
  withdrawn: number;
  status: 'ongoing' | 'pending' | 'expired';
}

const Stream = new Schema<IStream>({
  id_stream: { type: Number, required: true, unique: true },
  amount: { type: Number, required: true, unique: false },
  cancellable_date: { type: Number, required: true, unique: false },
  cliff_date: { type: Number, required: true, unique: false },
  end_date: { type: Number, required: true, unique: false },
  is_cancelled: { type: Boolean, required: true, unique: false },
  is_vesting: { type: Boolean, required: true, unique: false },
  rate: { type: Number, required: true, unique: false },
  receiver: { type: String, required: true, unique: false },
  sender: { type: String, required: true, unique: false },
  start_date: { type: Number, required: true, unique: false },
  token: { type: String, required: true, unique: false },
  withdrawn: { type: Number, required: true, unique: false },
  status: { type: String, required: true, unique: false },
});

export default model<IStream>('Stream', Stream);
