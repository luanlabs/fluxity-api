import { xdr } from '@stellar/stellar-sdk';

import { Rate } from '../../../../models/Lockup';
import { Networks } from '../../../../constant/network';
import ToScVal from '../../scVal';
import getConfig from '../../getConfig';
import envs from '../../../../env';

const { scvMap } = xdr.ScVal;
const { ScMapEntry: addToMap } = xdr;

const toXdrValue = async (address: string, token: string) => {
  const { adminKeypair } = await getConfig(Networks.Testnet);

  const { CLAIM_STREAM_AMOUNT } = envs();

  const startDate = Math.floor(Date.now() / 1000).toString();
  const endDate = String(Number(startDate) + Rate.Weekly);
  const cliffDate = startDate;
  const cancellableDate = endDate;

  const sender = adminKeypair.publicKey();

  const amount = BigInt(Number(CLAIM_STREAM_AMOUNT) * 10 ** 7);

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
      key: ToScVal.symbol('is_vesting'),
      val: ToScVal.boolean(false),
    }),
    new addToMap({
      key: ToScVal.symbol('rate'),
      val: ToScVal.u32(Rate.Weekly),
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
      key: ToScVal.symbol('spender'),
      val: ToScVal.address(adminKeypair.publicKey()),
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
