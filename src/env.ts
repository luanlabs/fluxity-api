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
  ];

  let status = false;

  for (let i = 0; i < envs.length; i++) {
    if (!process.env[envs[i]]) {
      console.log(envs[i] + ' is not defined');
      status = true;
    }
  }

  if (status) {
    process.exit(1);
  }
};

export default checkIfEnvsAreSet;
