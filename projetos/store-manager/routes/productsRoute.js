const express = require('express');
const {
  getAllProductsController,
  byIdProductsController,
  createProductsController,
  updateProductsController,
  removeProductsController,
} = require('../controllers/productsController');

const route = express.Router();
const { verifyProduct } = require('../middlewares/productsMiddleware');

route.get('/', getAllProductsController);
route.get('/:id', byIdProductsController);
route.post('/', verifyProduct, createProductsController);
route.put('/:id', verifyProduct, updateProductsController);
route.delete('/:id', removeProductsController);

module.exports = route;