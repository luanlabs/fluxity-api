const configSwagger = () => {
  const options = {
    definition: {
      openapi: '3.1.0',
      info: {
        title: 'Fluxity API',
        version: '0.1.0',
        description:
          'Fluxity API allows users to mint free tokens, subscribe to our news, and get aggregared data of the streams',
      },
      servers: [
        {
          url: 'https://api.fluxity.finance',
        },
        {
          url: 'http://localhost:3000',
        },
      ],
    },
    apis: ['./src/swagger/token/*.ts'],
  };
  return options;
};

export default configSwagger;
