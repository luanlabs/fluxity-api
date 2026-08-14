import type { Network } from './networkType';

/**
 * Standardized JSON envelope returned by every endpoint.
 */
export interface ApiResponseBody {
  status: 'error' | 'success';
  message: string;
  result: object | string | null | undefined;
}

declare module 'express-serve-static-core' {
  interface Response {
    /** Network resolved from the `:network` route param by `networkHandler`. */
    network: Network;

    /**
     * Sends a standardized JSON response envelope.
     *
     * @example
     * res.status(200).j({ status: 'success', message: 'OK', result: {} });
     */
    j: (body: ApiResponseBody) => this;
  }
}
