import token from '../../models/token';

const getToken = async () => {
  const find = await token.find({});
  return find;
};
export default getToken;
