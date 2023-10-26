import { Server } from 'soroban-client';

const getServer = (): Server => {
  const server = new Server(String(process.env.RPC_URL));
  return server;
};
export default getServer;
