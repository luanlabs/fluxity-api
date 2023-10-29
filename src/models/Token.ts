import { Schema, model } from 'mongoose';

export interface IToken {
  address: string;
  symbol: string;
  name: string;
  decimals: string;
}

const Token = new Schema<IToken>({
  address: { type: String, required: true, unique: true },
  symbol: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  decimals: { type: String, required: true, unique: false },
});

export default model<IToken>('Token', Token);
