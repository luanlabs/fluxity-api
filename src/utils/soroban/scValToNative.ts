import { xdr, scValToNative as toNative } from '@stellar/stellar-sdk';

const { ScVal } = xdr;

const fromXDR = (encoded: string) => {
  const buffer = Buffer.from(encoded, 'base64');
  const scVal = ScVal.fromXDR(buffer);
  return toNative(scVal).toString();
};

export default fromXDR;
