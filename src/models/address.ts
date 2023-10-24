import mongoose from 'mongoose';

const Address = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
});

export default mongoose.model('Address', Address);
