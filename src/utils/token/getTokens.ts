import Tokens from '../../models/Token';

const getTokens = async () => {
  const find = await Tokens.find({});
  return find;
};
export default getTokens;
