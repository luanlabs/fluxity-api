import { xdr, Address } from 'soroban-client';

import numberToScVal from './numberToScval';
import scValToNative from './scValToNative';

const { scvU32, scvU64, scvSymbol } = xdr.ScVal;

class ToScVal {
  public static i128(value: bigint) {
    return numberToScVal(value);
  }
  public static u32(number: number) {
    return scvU32(number);
  }
  public static address(address: string) {
    return Address.fromString(address).toScVal();
  }
  public static u64(number: string) {
    return scvU64(xdr.Uint64.fromString(number));
  }
  public static symbol(symbol: string) {
    return scvSymbol(symbol);
  }
  public static fromXDR(event: string) {
    return scValToNative(event);
  }
  public static toXDR(symbol: string) {
    return ToScVal.symbol(symbol).toXDR().toString('base64');
  }
}

export default ToScVal;
