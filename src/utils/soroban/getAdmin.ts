import { Keypair } from 'soroban-client';

const getAdmin = () => {
  return Keypair.fromSecret(String(process.env.ADMIN_SECRET_KEY));
};

export default getAdmin;
