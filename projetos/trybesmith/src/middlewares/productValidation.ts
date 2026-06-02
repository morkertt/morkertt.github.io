import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import ValidationsError from './error';

const schema = Joi.object({
  name: Joi.string().min(3).required(),
  amount: Joi.string().min(3).required(),
});

const validateSchema = async (req: Request, _resp: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);
  if (error?.message.includes('required')) {
    throw new ValidationsError(400, error.message);
  }
  if (error?.message.includes('string')) {
    throw new ValidationsError(422, error.message);
  }
  if (error?.message.includes('length')) {
    throw new ValidationsError(422, error.message);
  }
  next();
};

export default validateSchema;