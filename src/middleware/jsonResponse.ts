// import { Response } from 'express';
import { RequestHandler } from 'express';

interface IJsonResponse {
  status: 'error' | 'success';
  message: string;
  result: object | string | null | undefined;
}

declare module 'express-serve-static-core' {
  interface Response {
    /**
     * Json a response.
     *
     * Examples:
     *
     *     res.j({
     *      status: 'error' | 'success',
     *      message: 'text'
     *      result: {}
     *     });
     */
    j: (body: IJsonResponse) => this;
  }
}

const jsonResponse: RequestHandler = (req, res, next) => {
  res.j = (body: IJsonResponse) => {
    res.type('json');
    res.send(body);
    res.json;
    return res;
  };

  next();
};

export default jsonResponse;
