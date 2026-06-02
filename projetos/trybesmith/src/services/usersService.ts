import { Login } from '../interfaces/login.interface';
import { Users } from '../interfaces/users.interface';
import usersModels from '../models/usersModels';
import authService from './authService';

const usersService = {
  create: async (user: Users) => usersModels.create(user),

  login: async (loginData: Login) => {
    const userData = await usersModels.getByUser(loginData);
    const { id, username } = userData;
    const token = await authService.generateLogin({ id, username });
    return token;
  },

  isValid: async (user: Login) => {
    const result = await usersModels.isValid(user);
    return result;
  },
};

export default usersService;