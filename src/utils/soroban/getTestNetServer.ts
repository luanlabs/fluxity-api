import { SorobanRpc } from 'stellar-sdk';

const getTestNetServer = (): SorobanRpc.Server => {
  const server = new SorobanRpc.Server(String(process.env.TESTNET_FUTURENET_RPC_URL));
  return server;
};
export default getTestNetServer;
