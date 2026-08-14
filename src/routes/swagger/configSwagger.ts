import path from 'path';

const configSwagger = () => {
  const options = {
    definition: {
      openapi: '3.1.0',
      info: {
        title: 'Fluxity API',
        version: '0.1.0',
        description:
          'The Fluxity API lets users mint free testnet tokens and query aggregated lockup/stream data on the Stellar network.',
      },
      servers: [{ url: 'https://api.fluxity.finance' }, { url: 'http://localhost:3000' }],
    },
    // Resolved relative to this file (not the cwd) and matched against both the
    // TypeScript sources (dev via tsx) and the compiled output (production).
    apis: [path.join(__dirname, '../../swagger/**/*.{ts,js}')],
  };

  return options;
};

export default configSwagger;
