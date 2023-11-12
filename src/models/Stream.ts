import { Schema, model } from 'mongoose';

export interface IStream {
  id_stream: bigint;
  amount: bigint;
  cancellable_date: bigint;
  cliff_date: bigint;
  end_date: bigint;
  is_cancelled: boolean;
  is_vesting: boolean;
  rate: number;
  receiver: string;
  sender: string;
  start_date: bigint;
  token: string;
  withdrawn: bigint;
}

const Stream = new Schema<IStream>({
  id_stream: { type: BigInt, required: true, unique: true },
  amount: { type: BigInt, required: true, unique: false },
  cancellable_date: { type: BigInt, required: true, unique: false },
  cliff_date: { type: BigInt, required: true, unique: false },
  end_date: { type: BigInt, required: true, unique: false },
  is_cancelled: { type: Boolean, required: true, unique: false },
  is_vesting: { type: Boolean, required: true, unique: false },
  rate: { type: Number, required: true, unique: false },
  receiver: { type: String, required: true, unique: false },
  sender: { type: String, required: true, unique: false },
  start_date: { type: BigInt, required: true, unique: false },
  token: { type: String, required: true, unique: false },
  withdrawn: { type: BigInt, required: true, unique: false },
});

export default model<IStream>('Stream', Stream);
