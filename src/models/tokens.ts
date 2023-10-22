import mongoose from 'mongoose';

const Tokens = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  symbol: { type: String, required: true, unique: true },
});

export default mongoose.model('Tokens', Tokens);
