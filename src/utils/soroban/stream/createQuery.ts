import { ParsedQs } from 'qs';

const createQuery = (params: ParsedQs) => {
  const { sender, receiver, token } = params;

  const query: Record<string, string> = {};

  if (sender && typeof sender === 'string') {
    query['sender'] = sender;
  }

  if (receiver && typeof receiver === 'string') {
    query['receiver'] = receiver;
  }

  if (token && typeof token === 'string') {
    query['token'] = token;
  }

  return query;
};
export default createQuery;
