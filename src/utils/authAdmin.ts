import dotenv from 'dotenv';

dotenv.config();

const authAdmin = (header: string) => {
  if (header === process.env.ADMIN_PASSWORD) {
    return true;
  } else {
    return false;
  }
};

export default authAdmin;
