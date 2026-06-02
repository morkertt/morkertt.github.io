const { Op } = require('sequelize');
const { Category, BlogPost, PostCategory, User } = require('../database/models');

// Req 12 - Add the post and the category to the db 
const create = async (title, categoryIds, content, userId) => {
  const categories = await Category.findAll();
  const categoriesIds = categories.map(({ id }) => id);
  const exists = await categoryIds.some((id) => categoriesIds.includes(id));

  if (!exists) return 'category not found';

  const postCreated = await BlogPost.create({ title, content, userId });
  await Promise.all(categoryIds.map((categoryId) => 
  PostCategory.create({ categoryId, postId: postCreated.id })));
  return postCreated;
};

// Query to remove the password from the post
const QUERY = [
  {
    model: User,
    as: 'user',
    attributes: { exclude: ['password'] },
  }, {
    model: Category,
    as: 'categories',
  },
];

// Req 13 - Get all posts from the DB using the query
const getAll = async () => {
  const postList = await BlogPost.findAll({ include: QUERY });
  return postList;
};

// Req 14 - Get a post from the Db using ID
const getById = async (id) => {
  const post = await BlogPost.findOne({ where: { id }, include: QUERY });
  return post;
};

// Req 15 - Update the db with new info
const update = async (id, title, content) => {
  const [postExist] = await BlogPost.update(
    { title, content }, { where: { id } },
  );
  
  const post = await BlogPost.findOne({
    where: { id },
    include: QUERY,
  });

  return { postExist, post };
};

// Req 16 - Delete a post
const deletePost = async (userId, id) => {
  const post = await BlogPost.findOne({ where: { id } });
  if (!post) return 'Post does not exist';
  if (post.userId !== userId) {
    return 'unauthorized';
  }  
  await BlogPost.destroy({ where: { [Op.and]: [{ userId }, { id }] } });  
  return null;
};

module.exports = { create, getAll, getById, update, deletePost };