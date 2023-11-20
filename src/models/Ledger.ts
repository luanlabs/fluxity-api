import { Schema, model } from 'mongoose';

export interface ILedger {
  _id: string;
  last: string;
}

const Ledger = new Schema<ILedger>({
  _id: { type: String, required: true, unique: true },
  last: { type: String, required: true, unique: true },
});

export default model<ILedger>('Ledger', Ledger);
