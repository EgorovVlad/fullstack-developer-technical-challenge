import { Express } from 'express';
import listEndpoints from 'express-list-endpoints';

import config from '@/config/config';

export function generateAppSwagger(app: Express) {
  const endpoints = listEndpoints(app);
  const paths: Record<string, Record<string, object>> = {};

  endpoints.forEach((endpoint) => {
    const path = endpoint.path.replace(/:[^\s/]+/g, (match) => `{${match.substring(1)}}`);

    if (!paths[path]) {
      paths[path] = {};
    }

    endpoint.methods.forEach((method) => {
      paths[path][method.toLowerCase()] = {
        summary: `Generated ${method} endpoint for ${path}`,
        responses: {
          200: {
            description: 'Successful response',
          },
        },
      };
    });
  });

  return {
    openapi: '3.0.0',
    info: {
      title: 'Auto-generated Swagger Documentation',
      version: '1.0.0',
      description: 'This Swagger documentation is auto-generated from Express routes',
    },
    servers: [
      {
        url: `http://localhost:${config.PORT}`,
      },
    ],
    paths,
  };
}
