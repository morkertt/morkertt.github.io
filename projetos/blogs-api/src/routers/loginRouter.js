const { Router } = require('express');
const loginController = require('../controllers/loginController');

const loginRouter = Router();

// Req 03 - Create a POST for Login
loginRouter.post('/', loginController.login);

module.exports = loginRouter;