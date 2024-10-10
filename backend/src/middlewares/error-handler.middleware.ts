import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { AppError } from '@/errors/app.error';
import logger from '@/utils/logger';

const middleware: ErrorRequestHandler = (err, req, res, next) => {
  logger.error({ message: err.message, stack: err.stack });
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'An unexpected error occurred' });
  }
};

export default middleware;
