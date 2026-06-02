import { Request, Response } from 'express';
import JwtUtils from '../utils/Jwt.utils';
import { EMPTY_FIELD, INCORRECT_FIELD, INVALID_AUTHORIZATION } from '../utils/constants';
import AuthenticationService from '../service/authentication.service';
import Login from '../interface/Login.interface';
import ValidationsError from '../middleware/error';

export default class LoginController {
  constructor(private authenticationService = new AuthenticationService()) {}

  public login = async (req: Request, resp: Response) => {
    const userLogin = req.body;
    const { email, password } = userLogin;

    if (!email || !password) throw new ValidationsError(400, EMPTY_FIELD);

    const token = await this.authenticationService.verifyUser(userLogin as Login);

    if (token === INCORRECT_FIELD) throw new ValidationsError(401, INCORRECT_FIELD);

    return resp.status(200).json({ token });
  };

  public validateRole = async (req: Request, resp: Response) => {
    const { authorization } = req.headers;
    if (authorization) {
      const result = await JwtUtils.validate(authorization);
      const { role } = result;
      return resp.status(200).json({ role });
    }
    throw new ValidationsError(400, INVALID_AUTHORIZATION);
  };
}
