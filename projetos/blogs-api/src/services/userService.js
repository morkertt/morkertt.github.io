const db = require('../database/models');

// Req 04 - Add the user to the db
const createUser = async ({ displayName, email, password, image }) => {
  const newUser = await db.User.create({
    displayName, email, password, image,
  });
  return newUser;
};

// Req 04 - Function to verify if the email is already on the db
const findOne = async (email) => {
  const user = await db.User.findOne({ where: { email } });
  return user;
};

// Req 05 - Get all the users from the table
const findAll = async () => {
  const users = await db.User.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
  });

  return users;
};

// Req 06 - Get a single User By Id
const findById = async (id) => {
  const user = await db.User.findOne({ 
    where: { id }, 
    attributes: ['id', 'displayName', 'email', 'image'],
  });
  return user;
};

// Req 17 - Delete a user if he's on the db
// https://sequelize.org/docs/v6/core-concepts/model-querying-finders/
const deleteUser = async (id) => {
  const user = await db.User.findByPk(id);
  if (!user) return 'user not found';
  await db.User.destroy({ where: { id } });
};

module.exports = { createUser, findOne, findAll, findById, deleteUser };