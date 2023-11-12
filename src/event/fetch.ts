interface IFilter {
  type: string;
  contractIds: string[];
  topics: string[][];
}
interface IEvent {
  startLedger: string;
  filters: Array<IFilter>;
  pagination: object;
}

const getEventsServer = async (params: IEvent) => {
  let status = true;
  while (status) {
    try {
      const rpcUrl = String(process.env.TESTNET_FUTURENET_RPC_URL);

      const request = {
        jsonrpc: '2.0',
        id: 8675309,
        method: 'getEvents',
        params,
      };
      const response = await fetch(rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });
      const jsonResponse = await response.json();
      status = false;
      return jsonResponse;
    } catch {}
  }
};
export default getEventsServer;
