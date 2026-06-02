const salesService = require('../services/salesService');

const getAllSalesController = async (_req, resp) => {
  try {
  const result = await salesService.getAllSales();
  return resp.status(200).json(result);
  } catch (error) {
    return resp.status(error.status).json({ message: error.message });
  }
};

const getByIdSalesController = async (req, resp) => {
  const { id } = req.params;
  const result = await salesService.getByIdSales(id);
  if (result) return resp.status(200).json(result);
  return resp.status(404).json({ message: 'Sale not found' });
};

const createSalesController = async (req, resp) => {
  const result = await salesService.createSales(req.body);
  return resp.status(201).json(result);
};

const updateSalesController = async (req, resp) => {
  const [{ productId, quantity }] = req.body;
  const { id } = req.params;
  const result = await salesService.updateSales({ id, productId, quantity });
  if (result) {
    return resp.status(200).json({ saleId: id, itemUpdated: [{ productId, quantity }] });
  }
  return resp.status(404).json({ message: 'Sale not found' });
};

const removeSalesController = async (req, resp) => {
  const { id } = req.params;
  const result = await salesService.removeSalesService(id);
  if (result) return resp.status(204).end();
  return resp.status(404).json({ message: 'Sale not found' });
};

module.exports = { getAllSalesController,
  getByIdSalesController,
createSalesController,
updateSalesController,
removeSalesController };