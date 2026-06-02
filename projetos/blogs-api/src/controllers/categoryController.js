const categoryService = require('../services/categoryService');

// Req 08
const createCategory = async (req, resp) => {
  const { name } = req.body;
  if (!name) return resp.status(400).json({ message: '"name" is required' });

  const category = await categoryService.create({ name });
  return resp.status(201).json(category);
};

// Req 09
const getAllCategories = async (_req, resp) => {
  const categories = await categoryService.findAll();
  return resp.status(200).json(categories);
};

module.exports = { createCategory, getAllCategories };