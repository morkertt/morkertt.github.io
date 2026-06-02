import { Router } from 'express';
import LoginController from '../controller/login.controller';

const LoginRouter = Router();

const loginController = new LoginController();

LoginRouter.post('/', loginController.login);
LoginRouter.get('/validate', loginController.validateRole);

export default LoginRouter;
