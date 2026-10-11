import { xdr } from '@stellar/stellar-sdk';

import scValToNative from './scValToNative';

const { scvU64, scvSymbol } = xdr.ScVal;

class ToScVal {
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
