const checkSetEnvVariable = () => {
  const envVariables = [
    'DB_URI',
    'DB_NAME',
    'PORT',
    'ADMIN_SECRET_KEY',
    'ADMIN_PASSWORD',
    'TESTNET_FUTURENET_RPC_URL',
    'MAILER_SERVICE_USER',
    'MAC_MAILER_SERVICE_PASS',
    'BASE_FEE',
    'CONTRACT_ID',
    'NODE_ENV',
    'LOG_FILE_PATH',
  ];

  for (let i = 0; i < envVariables.length; i++) {
    if (!process.env[envVariables[i]]) {
      console.log('The env variables are not defined');
      process.exit(1);
    }
  }
};

export default checkSetEnvVariable;
