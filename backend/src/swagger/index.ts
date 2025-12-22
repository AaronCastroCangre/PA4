import swaggerJsdoc from 'swagger-jsdoc';
import { config } from '../config/index.js';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sistema de Pedidos API',
      version: '1.0.0',
      description: 'API para gestión de pedidos en tiempo real para restaurantes',
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
        description: 'Servidor de desarrollo',
      },
    ],
    tags: [
      {
        name: 'Pedidos',
        description: 'Operaciones relacionadas con pedidos',
      },
      {
        name: 'Mesas',
        description: 'Operaciones relacionadas con mesas',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
