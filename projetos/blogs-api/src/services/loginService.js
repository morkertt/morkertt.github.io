const db = require('../database/models');

const login = async ({ email, password }) => {
  const data = await db.User.findOne({ where: { email, password } });
  return data;
};

module.exports = { login };