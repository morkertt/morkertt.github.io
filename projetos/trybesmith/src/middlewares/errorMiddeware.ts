import { NextFunction, Request, Response } from 'express';
import ValidationsError from './error';

const handleErr = (error: ValidationsError, _req: Request, res: Response, _next: NextFunction) => {
  // Fixed by Carlos at morning mentorship
  const { message } = error;
  return res.status(error.status).json({ message });
};

export default handleErr;
