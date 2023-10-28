import { RequestHandler } from 'express';
import dotenv from 'dotenv';
import responseTemplate from './responseTemplate';

dotenv.config();

const authAdmin: RequestHandler = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json(
      responseTemplate({
        status: 'error',
        message: 'Authorization failed',
        result: {},
      }),
    );
  } else if (authorization === process.env.ADMIN_PASSWORD) {
    next();
  } else {
    return res.status(403).json(
      responseTemplate({
        status: 'error',
        message: 'Authorization failed',
        result: {},
      }),
    );
  }
};

export default authAdmin;
