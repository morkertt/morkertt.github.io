import { INCORRECT_FIELD } from '../utils/constants';
import JwtUtils from '../utils/Jwt.utils';
import UsersModel from '../database/models/user.model';
import Login from '../interface/Login.interface';

export default class AuthenticationService {
  verifyUser = async (login: Login): Promise<string> => {
    const user = await UsersModel.findOne({ where: { email: login.email } });

    if (!user) return INCORRECT_FIELD;

    const token = await JwtUtils.generateToken(user);

    return token as string;
  };
}
