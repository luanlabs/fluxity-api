import { Schema, model } from 'mongoose';

export interface ILedger {
  id: string;
  last: string;
}

const Ledger = new Schema<ILedger>({
  id: { type: String, required: true, unique: true },
  last: { type: String, required: true, unique: true },
});

export default model<ILedger>('Ledger', Ledger);
