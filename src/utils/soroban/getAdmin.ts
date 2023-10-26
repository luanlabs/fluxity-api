import { Keypair } from 'soroban-client';
import dotenv from 'dotenv';

dotenv.config();

const getAdmin = () => {
  return Keypair.fromSecret(String(process.env.ADMIN_SECRET_KEY));
};

export default getAdmin;
