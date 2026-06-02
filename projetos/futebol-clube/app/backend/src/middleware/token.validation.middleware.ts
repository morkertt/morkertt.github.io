import { Request, Response, NextFunction } from 'express';
import { TOKEN_NOT_FOUND } from '../utils/constants';
import JwtUtils from '../utils/Jwt.utils';
import ValidationsError from './error';

export default class TokenValidation {
  public isValid = async (req: Request, _resp: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) throw new ValidationsError(404, TOKEN_NOT_FOUND);

    JwtUtils.validate(authorization);

    next();
  };
}
