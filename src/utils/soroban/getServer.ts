import { Server } from 'soroban-client';

const getServer = (): Server => {
  const server = new Server('https://rpc-futurenet.stellar.org');
  return server;
};
export default getServer;
