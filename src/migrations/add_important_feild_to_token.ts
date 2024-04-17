import Token from '../models/Token';

async function tokenUp() {
  await Token.updateMany({ important: undefined }, { $set: { important: false } });
}

export default tokenUp;
