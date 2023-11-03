import { xdr, Address } from 'soroban-client';

const bigNumberFromBytes = (...bytes: number[]): bigint => {
  bytes[0] &= 0x7f;

  let b = BigInt(0);

  for (const byte of bytes) {
    b <<= BigInt(8);
    b |= BigInt(byte);
  }

  return b * BigInt(1);
};

const numberToScVal = (number: string) => {
  const amount = BigInt(number);
  let hexAmount = amount.toString(16);

  if (hexAmount.length % 2) {
    hexAmount = `0${hexAmount}`;
  }

  const buf = Buffer.from(hexAmount, 'hex');
  const padded = Buffer.alloc(16);
  buf.copy(padded, padded.length - buf.length);

  const hi = new xdr.Int64([
    Number(bigNumberFromBytes(...padded.subarray(4, 8))),
    Number(bigNumberFromBytes(...padded.subarray(0, 4))),
  ]);

  const lo = new xdr.Uint64([
    Number(bigNumberFromBytes(...padded.subarray(12, 16))),
    Number(bigNumberFromBytes(...padded.subarray(8, 12))),
  ]);

  const amountSc = xdr.ScVal.scvI128(new xdr.Int128Parts({ lo, hi }));

  return amountSc;
};

class ToScVal {
  public static i128(number: string) {
    return numberToScVal(number);
  }
  public static address(address: string) {
    return Address.fromString(address).toScVal();
  }
}

export default ToScVal;
