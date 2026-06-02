import { Request } from 'express';
import Joi from 'joi';
import ValidationsError from './error';

const schema = Joi.object({
  productsIds: Joi.array().items(Joi.number()).min(1).required(),
});

const orderValidate = async (req: Request) => {
  const { error, value } = schema.validate(req.body);
  
  if (error?.message.includes('required')) {
    throw new ValidationsError(400, error.message);
  }
  
  if (error?.message.includes('must contain')) {
    error.message = '"productsIds" must include only numbers';
    throw new ValidationsError(422, error.message);
  }
  
  if (error?.message.includes('array')) {
    throw new ValidationsError(422, error.message);
  }

  return value;
};

export default orderValidate;