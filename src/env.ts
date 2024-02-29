import enforceEnv from 'envil';

const checkIfEnvsAreSet = () => {
  const envs = [
    'DB_URI',
    'DB_NAME',
    'PORT',
    'ADMIN_SECRET_KEY',
    'ADMIN_PASSWORD',
    'TESTNET_FUTURENET_RPC_URL',
    'MAINNET_FUTURENET_RPC_URL',
    'MAILER_SERVICE_USER',
    'MAC_MAILER_SERVICE_PASS',
    'BASE_FEE',
    'TESTNET_CONTRACT_ID',
    'MAINNET_CONTRACT_ID',
    'NODE_ENV',
    'LOG_FILE_PATH',
    'CLAIM_STREAM_AMOUNT',
    'CLAIM_TOKEN_AMOUNT',
  ];

  enforceEnv(envs);
};

export default checkIfEnvsAreSet;
