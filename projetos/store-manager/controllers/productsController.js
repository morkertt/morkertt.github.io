const productsService = require('../services/productsService');

const getAllProductsController = async (_req, resp) => {
  try {
    const result = await productsService.getAllProducts();
    return resp.status(200).json(result);
  } catch (error) {
    return resp.status(error.status).json({ message: error.message });
  }
};

const byIdProductsController = async (req, resp) => {
  const { id } = req.params;
  const result = await productsService.byIdProducts(id);
  if (result) return resp.status(200).json(result);
  return resp.status(404).json({ message: 'Product not found' });
};

const createProductsController = async (req, resp) => {
  const { name, quantity } = req.body;
  const result = await productsService.insertProduct(name, quantity);
  if (result) {
    return resp.status(201).json(result);
  }
  return resp.status(409).json({ message: 'Product already exists' });
};

const updateProductsController = async (req, resp) => {
  const { name, quantity, productId } = req.body;
  const { id } = req.params;
  const result = await productsService.updateProducts({ id, name, quantity, productId });
  if (result.status === 404) {
    return resp.status(404).json({ message: result.message });
  }
  return resp.status(result.status).json(result.message);
};

const removeProductsController = async (req, resp) => {
  const { id } = req.params;
  const result = await productsService.removeProducts(id);
  if (result.status === 404) {
    return resp.status(404).json({ message: result.message });
  }
  return resp.sendStatus(204);
};

module.exports = { getAllProductsController,
  byIdProductsController,
  createProductsController,
  updateProductsController,
  removeProductsController };