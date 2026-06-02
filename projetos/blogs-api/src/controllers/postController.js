const jwt = require('jsonwebtoken');
const postService = require('../services/postService');

const SECRET = process.env.JWT_SECRET;

// Req 12 - Function that creates a new post 
const create = async (req, resp) => {
  const { title, categoryIds, content } = req.body;
  if (!title || !categoryIds || !content) {
    return resp.status(400).json({ message: 'Some required fields are missing' });
  }
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, SECRET);
  const userId = decoded.data.id;
  const postCreated = await postService.create(title, categoryIds, content, userId);

  if (postCreated === 'category not found') {
    return resp.status(400).json({ message: '"categoryIds" not found' });
  }

  return resp.status(201).json(postCreated);
};

// Req 13 - Function to get all the posts
const getAll = async (_req, resp) => {
  const postList = await postService.getAll();
  if (!postList) return resp.status(500).json({ message: 'GetAllPosts dont have a valid return' });
  return resp.status(200).json(postList);
};

// Req 14 - Get a post By Id
const getById = async (req, resp) => {
  const { id } = req.params;
  const postById = await postService.getById(id);
  if (!postById) return resp.status(404).json({ message: 'Post does not exist' });
  return resp.status(200).json(postById);
};

// Req 15 - Post Update if exists
const update = async (req, resp) => {
  const { id } = req.params;
  const { title, content } = req.body;
  if (!title || !content || !id) {
    return resp.status(400).json({ message: 'Some required fields are missing' });
  }

  const { postExist, post } = await postService.update(id, title, content);

  if (!postExist) return resp.status(401).json({ message: 'Unauthorized user' });

  return resp.status(200).json(post);
};

// Req 16 - Delete a post
const deletePost = async (req, resp) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const decript = jwt.verify(token, SECRET);
  const userId = decript.data.id;

  const response = await postService.deletePost(userId, id);
  
  if (response === 'unauthorized') return resp.status(401).json({ message: 'Unauthorized user' });

  if (response) return resp.status(404).json({ message: response });

  return resp.status(204).end();
};

module.exports = { create, getAll, getById, update, deletePost };