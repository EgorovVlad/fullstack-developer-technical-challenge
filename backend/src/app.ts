import 'reflect-metadata';
import 'express-async-errors';
import fs from 'node:fs/promises';
import path from 'node:path';

import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';

import appRouter from '@/app.router';
import config from '@/config/config';
import { Injection, InjectionContainer } from '@/injection';
import errorHandlerMiddleware from '@/middlewares/error-handler.middleware';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { generateAppSwagger } from '@/utils/generate-app-swagger';
import logger from '@/utils/logger';

const main = async () => {
  const appRateLimiter = rateLimit({
    windowMs: config.RATE_LIMIT_WINDOW_MS,
    limit: config.RATE_LIMIT_MAX,
    message: 'Too many requests from this IP, please try again later.',
  });

  const appCors = cors({
    origin: config.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const app = express();
  app
    .disable('x-powered-by') // Disable X-Powered-By to avoid disclosing Express
    .use(express.json({ limit: '100mb' })) // Body parser to parse JSON payloads
    .use(express.urlencoded({ extended: true })) // Body parser to parse URL-encoded payloads
    .use(helmet()) // Secure HTTP headers with Helmet
    .use(appCors) // CORS configuration to restrict domains
    .use(appRateLimiter) // Rate limiter to protect against DOS attacks
    .use('/api/v1', appRouter)
    .use(errorHandlerMiddleware);

  // Serve logs
  app.get('/logs', async (req, res) => {
    const logFilePath = path.join(__dirname, '../logs/combined.log');
    const logFile = await fs.readFile(logFilePath, 'utf8').catch(() => '');
    res.send(`<pre>${logFile}</pre>`); // Display logs in a readable format
  });

  // Serve Swagger UI
  const swaggerSpec = generateAppSwagger(app);
  app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  try {
    const prismaService = InjectionContainer.get<PrismaService>(Injection.PrismaService);
    await prismaService.connect();

    app.on('error', (error) => logger.error('Express server error:', error));
    app.listen(config.PORT, () => logger.info(`Server running on http://localhost:${config.PORT}`));
  } catch (error) {
    logger.error('Failed to start server:', error);
  }
};

void main();
