import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { errorCatalog, ErrorTypes } from '../err/catalog';

const errorHandler: ErrorRequestHandler = (err: Error | ZodError, _req, resp, _next) => {
  if (err instanceof ZodError) return resp.status(400).json({ error: err.issues });

  const messageType = err.message as keyof typeof ErrorTypes;
  const errorType = errorCatalog[messageType];

  if (errorType) {
    const { httpStatus, error } = errorType;
    return resp.status(httpStatus).json({ error });
  }

  return resp.status(500).json({ message: 'internal error' });
};

export default errorHandler;