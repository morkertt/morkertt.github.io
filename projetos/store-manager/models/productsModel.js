const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute('SELECT * FROM products');
  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return result;
};

const getByName = async (name) => {
  const [result] = await connection.execute('SELECT * FROM products WHERE name = ?', [name]);
  return result;
};

const insertToDb = async (name, quantity) => {
  const [result] = await connection.execute(`INSERT INTO products(name,   quantity) 
  VALUES (?, ?)`, [name, quantity]);
  return result.insertId;
};

const updateDb = async ({ id, name, quantity }) => {
  const isOnDb = await getById(id);
  if (isOnDb.length === 0) return false;
  await connection.execute(`UPDATE products SET name = ?, quantity = ?
    WHERE id = ?`, [name, quantity, id]);
  return true;
};

const removeFromDb = async (id) => {
  const isOnDb = await getById(id);
  if (isOnDb.length === 0) return false;
  await connection.execute('DELETE FROM products WHERE id = ?', [id]);
  return true;
};

const selledProducts = async (data) => {
  const [{ productId, quantity }] = data;
  const [item] = await getById(productId);
  const updatedQuantity = item.quantity - quantity;
  const query = 'UPDATE products SET quantity = ? WHERE id = ?';
  await connection.execute(query, [updatedQuantity, productId]);
};

module.exports = { getAll, getById, getByName, insertToDb, updateDb, removeFromDb, selledProducts };