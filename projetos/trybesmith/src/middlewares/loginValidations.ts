import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import usersService from '../services/usersService';
import ValidationsError from './error';

const schema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(8).required(),
});

const validateLogin = async (req:Request, _resp: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);
  const isValid = await usersService.isValid(req.body);
  if (error?.message.includes('required')) {
    throw new ValidationsError(400, error.message);
  }
  if (error?.message.includes('string')) {
    throw new ValidationsError(422, error.message);
  }
  if (error?.details[0].type.includes('min')) {
    throw new ValidationsError(422, error?.message);
  }
  if (!isValid) {
    throw new ValidationsError(401, 'Username or password invalid');
  }
  next();
};

export default validateLogin;