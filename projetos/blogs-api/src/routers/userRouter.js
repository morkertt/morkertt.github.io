const { Router } = require('express');

const usersRouter = Router();
const userController = require('../controllers/userController');
const tokenValidate = require('../middlewares/tokenValidate');

usersRouter.post('/', userController.createUser);
usersRouter.get('/', tokenValidate, userController.allUsers);
usersRouter.get('/:id', tokenValidate, userController.getUserById);
usersRouter.delete('/me', tokenValidate, userController.deleteUser);

module.exports = usersRouter;
