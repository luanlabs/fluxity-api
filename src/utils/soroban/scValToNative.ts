import { xdr, scValToNative as toNative } from 'soroban-client';

const { ScVal } = xdr;

const fromXDR = (xdr: string) => {
  const bufEvent = Buffer.from(xdr, 'base64');
  const xdrEvent = ScVal.fromXDR(bufEvent);
  const nativeEvent = toNative(xdrEvent).toString();
  return nativeEvent;
};

export default fromXDR;
