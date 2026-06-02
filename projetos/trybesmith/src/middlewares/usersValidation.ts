import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import ValidationsError from './error';

const schema = Joi.object({
  username: Joi.string().min(3).required(),
  classe: Joi.string().min(3).required(),
  level: Joi.number().min(1).required(),
  password: Joi.string().min(8).required(),
});

const userValide = async (req: Request, resp: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);

  if (error?.message.includes('required')) {
    throw new ValidationsError(400, error.message);
  }
  if (error?.message.includes('number') || error?.message.includes('string')) {
    throw new ValidationsError(422, error.message);
  }
  if (error?.details[0].type.includes('min')) {
    throw new ValidationsError(422, error.message);
  }
  next();
};

export default userValide;