import Token from '../models/Token';

async function tokenUp() {
  await Token.updateMany({ network: undefined }, { $set: { network: 'testnet' } });
}

export default tokenUp;
