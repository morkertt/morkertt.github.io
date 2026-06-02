const { Router } = require('express');

const postRouter = Router();
const postController = require('../controllers/postController');
const tokenValidate = require('../middlewares/tokenValidate');

postRouter.get('/', tokenValidate, postController.getAll);
postRouter.get('/:id', tokenValidate, postController.getById);
postRouter.put('/:id', tokenValidate, postController.update);
postRouter.post('/', tokenValidate, postController.create);
postRouter.delete('/:id', tokenValidate, postController.deletePost);

module.exports = postRouter;
