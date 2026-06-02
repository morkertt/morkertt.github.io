const { Router } = require('express');
const tokenValidate = require('../middlewares/tokenValidate');
const categoryController = require('../controllers/categoryController');

const categoryRouter = Router();

// Req 08
categoryRouter.post('/', tokenValidate, categoryController.createCategory);
// Req 09
categoryRouter.get('/', tokenValidate, categoryController.getAllCategories);

module.exports = categoryRouter;
