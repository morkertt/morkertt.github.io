import { verify, Secret, SignOptions, sign, JwtPayload } from 'jsonwebtoken';
import ValidationsError from '../middleware/error';
import User from '../interface/User.interface';
import { INVALID_TOKEN } from './constants';

const SECRET: Secret = 'jwt_secret';

const generateToken = (user: User): string => {
  const jwtConfig = {
    expiresIn: '3d',
    algorithm: 'HS256',
  } as SignOptions;
  const privateKey = 'jwt_secret' as Secret;
  const { username, role, email, password } = user as User;
  const token = sign({ username, role, email, password }, privateKey, jwtConfig);
  return token;
};

const validate = (token: string): JwtPayload => {
  try {
    const result = verify(token, SECRET);
    return result as JwtPayload;
  } catch {
    throw new ValidationsError(401, INVALID_TOKEN);
  }
};

export default { generateToken, validate };
