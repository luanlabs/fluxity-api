import { Schema, model } from 'mongoose';

export interface IAlreadyMinted {
  address: string;
}

const AlreadyMinted = new Schema<IAlreadyMinted>({
  address: { type: String, required: true, unique: true },
});

export default model<IAlreadyMinted>('AlreadyMinted', AlreadyMinted);
