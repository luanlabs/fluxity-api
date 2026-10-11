import path from 'path';

import { isMainnetEnabled } from '../../env';

const configSwagger = () => {
  const swaggerRoot = path.join(__dirname, '../../swagger');
  const options = {
    definition: {
      openapi: '3.1.0',
      info: {
        title: 'Fluxity API',
        version: '0.1.0',
        description:
          'The Fluxity API manages token metadata and queries aggregated lockup/stream data on the Stellar network.',
      },
      servers: [{ url: 'https://api.fluxity.finance' }, { url: 'http://localhost:3000' }],
    },
    // Resolved relative to this file (not the cwd) and matched against both the
    // TypeScript sources (dev via tsx) and the compiled output (production).
    apis: isMainnetEnabled()
      ? [path.join(swaggerRoot, '**/*.{ts,js}')]
      : [path.join(swaggerRoot, 'health.{ts,js}'), path.join(swaggerRoot, '**/testnet/*.{ts,js}')],
  };

  return options;
};

export default configSwagger;
