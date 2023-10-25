import { Keypair } from 'soroban-client';
import dotenv from 'dotenv';

dotenv.config();

const adminSecretKey = process.env.ADMIN_SECRET_KEY;

class getAccount {
  public static accountAddress(): string {
    if (typeof adminSecretKey === 'string') {
      const key = Keypair.fromSecret(adminSecretKey);
      return key.publicKey();
    }
    return '';
  }

  public static accountPrivetKey() {
    if (typeof adminSecretKey === 'string') {
      const key = Keypair.fromSecret(adminSecretKey);
      return key;
    }
  }
}
export default getAccount;
