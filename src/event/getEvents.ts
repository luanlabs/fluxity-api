import log from '../logger';
import { Network } from '../types/networkType';
import request from '../utils/request';
import getConfig from '../utils/soroban/getConfig';

interface IFilter {
  type: string;
  contractIds: string[];
  topics: string[][];
}
interface IEvent {
  startLedger: number;
  filters?: IFilter[];
  pagination?: object;
}

const getEvents = async (params: IEvent, network: Network) => {
  try {
    const { server: rpcUrl } = await getConfig(network);

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

    return await request(rpcUrl.serverURL._string, config);
  } catch (e) {
    log.error({ message: e.message });
  }
};
export default getEvents;
