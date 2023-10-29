import { Response } from 'express';

interface IResponseTemplate {
  status: 'error' | 'success';
  message: string;
  result: object | string | null | undefined;
}

type Send<T = Response> = (body?: IResponseTemplate) => T;

export interface IResponse extends Response {
  json: Send<this>;
}
