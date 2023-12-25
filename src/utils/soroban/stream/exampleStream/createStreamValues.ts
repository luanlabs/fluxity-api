import { xdr } from 'stellar-sdk';
import ToScVal from '../../scVal';
import getAdmin from '../../getAdmin';

const { scvMap } = xdr.ScVal;
const { ScMapEntry: addToMap } = xdr;

const toXdrValue = (address: string, token: string) => {
  const startDate = Math.floor(Date.now() / 1000).toString();
  const endDate = String(Number(startDate) + 2592000);
  const cliffDate = startDate;
  const cancellableDate = endDate;
  const sender = getAdmin().publicKey();
  const amount = BigInt('5000000000');

  return scvMap([
    new addToMap({
      key: ToScVal.symbol('amount'),
      val: ToScVal.i128(amount),
    }),
    new addToMap({
      key: ToScVal.symbol('cancellable_date'),
      val: ToScVal.u64(cancellableDate),
    }),
    new addToMap({
      key: ToScVal.symbol('cliff_date'),
      val: ToScVal.u64(cliffDate),
    }),
    new addToMap({
      key: ToScVal.symbol('end_date'),
      val: ToScVal.u64(endDate),
    }),
    new addToMap({
      key: ToScVal.symbol('rate'),
      val: ToScVal.u32(2592000),
    }),
    new addToMap({
      key: ToScVal.symbol('receiver'),
      val: ToScVal.address(address),
    }),
    new addToMap({
      key: ToScVal.symbol('sender'),
      val: ToScVal.address(sender),
    }),
    new addToMap({
      key: ToScVal.symbol('start_date'),
      val: ToScVal.u64(startDate),
    }),
    new addToMap({
      key: ToScVal.symbol('token'),
      val: ToScVal.address(token),
    }),
  ]);
};

export default toXdrValue;
