import Stream from '../models/Stream';

async function streamUp() {
  await Stream.updateMany({ network: undefined }, { $set: { network: 'testnet' } });
}

export default streamUp;
