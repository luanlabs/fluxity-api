import { RequestHandler } from 'express';
import { createHash, timingSafeEqual } from 'crypto';

import envs from '../env';

// Hashing both sides to a fixed length lets us compare in constant time without
// leaking the password length and without timingSafeEqual throwing on mismatch.
const sha256 = (value: string) => createHash('sha256').update(value).digest();

const authAdmin: RequestHandler = (req, res, next) => {
  const { authorization } = req.headers;
  const { ADMIN_PASSWORD } = envs();

  const authorized =
    typeof authorization === 'string' &&
    timingSafeEqual(sha256(authorization), sha256(ADMIN_PASSWORD));

  if (!authorized) {
    return res.status(403).j({
      status: 'error',
      message: 'Authorization failed',
      result: {},
    });
  }

  next();
};

export default authAdmin;
