const productsModel = require('../models/productsModel');

const getAllProducts = async () => {
  const result = await productsModel.getAll();
  return result;
};

const byIdProducts = async (id) => {
  const [result] = await productsModel.getById(id);
  if (!result) return false;
  return result;
};

const insertProduct = async (name, quantity) => {
  const checkIfExists = await productsModel.getByName(name);
  if (checkIfExists.length === 0) {
  const id = await productsModel.insertToDb(name, quantity);
  return { id, name, quantity };
  }
  return false;
};

const updateProducts = async (data) => {
  const result = await productsModel.updateDb(data);
  if (result) {
    return { status: 200, message: data };
  }
  return { status: 404, message: 'Product not found' };
};

const removeProducts = async (id) => {
  const result = await productsModel.removeFromDb(id);
  if (result) return { status: 204 };
  return { status: 404, message: 'Product not found' };
};

module.exports = { getAllProducts, byIdProducts, insertProduct, updateProducts, removeProducts }; 