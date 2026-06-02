const express = require('express');
const {
  getAllSalesController,
  getByIdSalesController,
  createSalesController,
  updateSalesController,
  removeSalesController,
} = require('../controllers/salesController');

const { verifySale, updateQuantity } = require('../middlewares/salesMiddleware');

const route = express.Router();

route.get('/', getAllSalesController);
route.get('/:id', getByIdSalesController);
route.post('/', verifySale, updateQuantity, createSalesController);
route.put('/:id', verifySale, updateSalesController);
route.delete('/:id', removeSalesController);

module.exports = route;
