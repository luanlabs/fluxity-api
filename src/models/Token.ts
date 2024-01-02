import { Schema, model } from 'mongoose';

export interface IToken {
  address: string;
  symbol: string;
  name: string;
  decimals: string;
  logo?: string;
  claimable: boolean;
  network: 'mainnet' | 'testnet';
}

const Token = new Schema<IToken>({
  address: { type: String, required: true, unique: true },
  symbol: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  decimals: { type: String, required: true, unique: false },
  logo: { type: String, required: false, unique: false },
  claimable: { type: Boolean, required: true, unique: false, default: false },
  network: { type: String, required: false, unique: false, default: 'mainnet' },
});

export default model<IToken>('Token', Token);
