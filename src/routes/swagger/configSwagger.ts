const configSwagger = () => {
  const options = {
    definition: {
      openapi: '3.1.0',
      info: {
        title: 'Fluxity API',
        version: '0.1.0',
        description: 'This is a API fluxity',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
    },
    apis: ['./src/routes/swagger/apis/*.ts'],
  };
  return options;
};

export default configSwagger;
