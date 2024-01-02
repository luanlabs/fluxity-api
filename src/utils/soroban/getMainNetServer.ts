import { SorobanRpc } from 'stellar-sdk';

const getMainNetServer = (): SorobanRpc.Server => {
  const server = new SorobanRpc.Server(String(process.env.MAINNET_FUTURENET_RPC_URL));
  return server;
};
export default getMainNetServer;
