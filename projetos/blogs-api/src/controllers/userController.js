const jwt = require('jsonwebtoken');
const { userValidation } = require('../middlewares/userValidation');
const userService = require('../services/userService');
const tokenService = require('../services/tokenService');

const SECRET = process.env.JWT_SECRET;

// Req 04 - Create a new User and some Verifications
const createUser = async (req, resp) => {
  const { displayName, email, password, image } = req.body;
  if (!displayName || displayName.length < 8) {
    const message = '"displayName" length must be at least 8 characters long';
    return resp.status(400).json({ message });
  }
  const isntValid = userValidation({ email, password });
  console.log('é invalido   ', isntValid);
  if (isntValid) return resp.status(400).json({ message: isntValid });
  
  const isCreated = await userService.findOne(email);
  console.log('Já esta criado   ', isCreated);
  if (isCreated) return resp.status(409).json({ message: 'User already registered' });

  const user = await userService.createUser({ displayName, email, password, image });
  const token = tokenService(user);
  return resp.status(201).json({ token });
};

// Req 05 - Get all Users from DataBase
const allUsers = async (_req, resp) => {
  const allUsersList = await userService.findAll();
  return resp.status(200).json(allUsersList);
};

// Req 06 - Get User by Id
const getUserById = async (req, resp) => {
  const { id } = req.params;
  const user = await userService.findById(id);
  if (user) return resp.status(200).json(user);
  const message = 'User does not exist';
  return resp.status(404).json({ message });
};

// Req 17 - Delete User(me)
const deleteUser = async (req, resp) => {
  const token = req.headers.authorization;
  const decript = jwt.verify(token, SECRET);
  const userId = decript.data.id;
  
  const userSearch = await userService.deleteUser(userId);

  if (userSearch === 'user not found') {
    return resp.status(404).json({ message: 'User not found' });
  }

  return resp.status(204).end();
};

module.exports = { createUser, allUsers, getUserById, deleteUser };