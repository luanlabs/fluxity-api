import { Schema, model } from 'mongoose';
import { Network } from '../types/networkType';

export interface IToken {
  address: string;
  symbol: string;
  name: string;
  decimals: string;
  logo?: string;
  claimable?: boolean;
  important?: boolean;
  network: Network;
}

const Token = new Schema<IToken>({
  address: { type: String, required: true },
  symbol: { type: String, required: true },
  name: { type: String, required: true },
  decimals: { type: String, required: true },
  logo: { type: String, required: false },
  claimable: { type: Boolean, required: true, default: false },
  important: { type: Boolean, required: true, default: false },
  network: { type: String, required: true },
});

export default model<IToken>('Token', Token);
