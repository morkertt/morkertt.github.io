import dotenv from 'dotenv';
import { Request } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { JwtInterface } from '../interfaces/jwtPayload.interface';
import { Users } from '../interfaces/users.interface';
import ValidationsError from '../middlewares/error';
import productsModels from '../models/productModels';

dotenv.config();
const secret = process.env.JWT_SECRET || 'MySecret';

const authService = {
  generateToken: async (req: Request) => {
    const { password, ...data } = req.body as Users;
    const token: string = sign({ data }, secret, { expiresIn: '30m' });
    return token;
  },
  
  generateLogin: async (user:{ id: string, username:string }) => {
    const token: string = sign({ user }, secret, { expiresIn: '30m' });
    return token;
  },

  valideToken: (token: string) => {
    try {
      const { user } = verify(token, secret) as JwtInterface;
      const { id } = user;
      return id;
    } catch (error) {
      throw new ValidationsError(401, 'Invalid token');
    }
  },

  update: async (productId: number, orderId: number) => {
    await productsModels.update(productId, orderId);
  },
};

export default authService;