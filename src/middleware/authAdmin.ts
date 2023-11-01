import { RequestHandler } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const authAdmin: RequestHandler = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(403).json({
      status: 'error',
      message: 'Authorization failed',
      result: {},
    });
  } else if (authorization === process.env.ADMIN_AUTH_KEY) {
    next();
  } else {
    return res.status(403).json({
      status: 'error',
      message: 'Authorization failed',
      result: {},
    });
  }
};

export default authAdmin;
