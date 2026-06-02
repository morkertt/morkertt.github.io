const db = require('../database/models');

// Req 08 

const create = async ({ name }) => {
  const category = await db.Category.create({ name }, { fields: ['name'] });
  return category;
};

// Req 09
const findAll = async () => {
  const categories = db.Category.findAll({ attributes: ['id', 'name'] });
  return categories;
};

module.exports = { create, findAll };
