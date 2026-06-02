import { Request } from 'express';
import Joi from 'joi';
import ValidationsError from './error';

const schema = Joi.string().required();

const tokenIsValid = async (req: Request) => {
  const { error, value } = schema.validate(req.headers.authorization);

  if (error) {
    throw new ValidationsError(401, 'Token not found');
  }

  return value;
};

export default tokenIsValid;