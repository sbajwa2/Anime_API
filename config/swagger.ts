import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Anime Recommendation API',
      version: '1.0.0',
      description: 'API to manage anime recommendations',
    },
  },
  apis: ['./src/api/v1/routes/*.ts'], // Make sure this matches your route path
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
