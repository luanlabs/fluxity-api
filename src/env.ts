import enforceEnv from 'envil';

const envs = () => {
  const envValues = [
    'DB_URI',
    'DB_NAME',
    'PORT',
    'NODE_ENV',
    'BASE_FEE',
    'ADMIN_PASSWORD',
    'LOG_FILE_PATH',
    'ADMIN_SECRET_KEY',
    'CLAIM_TOKEN_AMOUNT',
    'TESTNET_CONTRACT_ID',
    'MAINNET_CONTRACT_ID',
    'CLAIM_STREAM_AMOUNT',
    'MAINNET_SOROBAN_RPC_URL',
    'TESTNET_SOROBAN_RPC_URL',
  ];

  return enforceEnv(envValues, { returnValues: true });
};

export default envs;
