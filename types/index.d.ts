export {};

declare global {
  namespace Express {
    interface Response {
      network: string;
    }
  }
}
