import request from '../utils/request';

interface IFilter {
  type: string;
  contractIds: string[];
  topics: string[][];
}
interface IEvent {
  startLedger: string;
  filters?: IFilter[];
  pagination?: object;
}

const getEvents = async (params: IEvent) => {
  try {
    const rpcUrl = String(process.env.TESTNET_FUTURENET_RPC_URL);

    const requestBody = {
      jsonrpc: '2.0',
      id: 8675309,
      method: 'getEvents',
      params,
    };

    const config = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    };

    return await request(rpcUrl, config);
  } catch {}
};
export default getEvents;
