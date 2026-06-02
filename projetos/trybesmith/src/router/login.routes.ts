import { Router } from 'express';
import usersController from '../controller/usersController';
import loginValidation from '../middlewares/loginValidations';

const login = Router();

login.post('/login', loginValidation, usersController.login);

export default login;