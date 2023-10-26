import { RequestHandler } from 'express';
import dotenv from 'dotenv';
import responseTemplate from './responseTemplate';

dotenv.config();

const isAuthorization: RequestHandler = (req, res, next) => {
  const Authorization = req.headers.authorization;
  if (!Authorization) {
    return res.status(401).json(
      responseTemplate({
        status: 'error',
        message: 'Authorization not found',
        result: {},
      }),
    );
  } else if (Authorization === process.env.ADMIN_PASSWORD) {
    next();
  } else {
    return res.status(403).json(
      responseTemplate({
        status: 'error',
        message: 'Access not found',
        result: {},
      }),
    );
  }
};

export default isAuthorization;
