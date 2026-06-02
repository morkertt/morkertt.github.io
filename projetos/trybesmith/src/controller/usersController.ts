import { Request, Response } from 'express';
import { Login } from '../interfaces/login.interface';
import { Users } from '../interfaces/users.interface';
import authService from '../services/authService';
import usersService from '../services/usersService';

const usersController = {
  create: async (req: Request, resp: Response) => {
    const user = req.body as Users;
    await usersService.create(user);
    const token = await authService.generateToken(req);
    return resp.status(201).json({ token });
  },

  login: async (req: Request, resp: Response) => {
    const loginData = req.body as Login;
    const token = await usersService.login(loginData);
    return resp.status(200).json({ token });
  },
};

export default usersController;