import { xdr, scValToNative as toNative } from 'soroban-client';

const scValToNative = (event: string) => {
  const bufEvent = Buffer.from(event, 'base64');
  const xdrEvent = xdr.ScVal.fromXDR(bufEvent);
  const nativeEvent = toNative(xdrEvent).toString();
  return nativeEvent;
};
export default scValToNative;
