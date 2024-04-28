import { xdr, scValToNative as toNative } from '@stellar/stellar-sdk';

const { ScVal } = xdr;

const fromXDR = (xdr: string) => {
  const bufEvent = Buffer.from(xdr, 'base64');
  const xdrEvent = ScVal.fromXDR(bufEvent);
  const nativeEvent = toNative(xdrEvent).toString();
  return nativeEvent;
};

export default fromXDR;
