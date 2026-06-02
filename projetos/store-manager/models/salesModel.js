const connection = require('./connection');

const salesList = (data) => {
  const saleId = data.sale_id;
  const productId = data.product_id;
  const { date, quantity } = data;
  return { saleId, date, productId, quantity };
};

const salesListById = (data) => {
  const productId = data.product_id;
  const { date, quantity } = data;
  return { date, productId, quantity };
};

const getAll = async () => {
  const [result] = await connection.execute(
    `SELECT sp.sale_id, s.date AS date, sp.product_id, sp.quantity FROM sales 
      AS s INNER JOIN sales_products AS sp ON s.id = sp.sale_id;`,
    );
  return result.map(salesList);
};

const getById = async (id) => {
  const [result] = await connection.execute(
    `SELECT s.date, sp.product_id, sp.quantity FROM sales AS s
      INNER JOIN sales_products AS sp ON s.id = sp.sale_id
      WHERE s.id = ?;`,
    [id],
);
  return result.map(salesListById);
};

const insertSale = async (data) => {
  const [{ insertId }] = await connection.execute('INSERT INTO sales (date) VALUES(sysdate())');
  data.map(async ({ productId, quantity }) => {
    await connection.execute(`INSERT INTO sales_products(sale_id, product_id, quantity) 
    VALUES(?,?,?)`, [insertId, productId, quantity]);
  });
  return insertId;
};

const updateSaleDb = async ({ id, productId, quantity }) => {
  const query1 = 'SELECT * FROM sales_products WHERE sale_id = ? AND product_id = ?';
  const [verify] = await connection.execute(query1, [id, productId]);
  if (verify.length === 0) {
    return false;
  }
  await connection.execute(`UPDATE sales_products SET product_id = ?, quantity = ? 
  WHERE sale_id = ? AND product_id = ?`, [productId, quantity, id, productId]);
  return true;
};

const removeSalesModel = async (id) => {
  const query = 'DELETE FROM sales WHERE id = ?';
  await connection.execute(query, [id]);
};

module.exports = { getAll, getById, insertSale, updateSaleDb, removeSalesModel };