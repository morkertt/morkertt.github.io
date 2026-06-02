import { Router } from 'express';
import usersController from '../controller/usersController';
import userValide from '../middlewares/usersValidation';

const users = Router();

users.post('/users', userValide, usersController.create);

export default users;