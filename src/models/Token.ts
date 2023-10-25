import mongoose from 'mongoose';

export interface TokenType {
  address: string;
  symbol: string;
  name: string;
  decimals: string;
}

const Token = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  symbol: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  decimals: { type: String, required: true, unique: false },
});

export default mongoose.model('Token', Token);
