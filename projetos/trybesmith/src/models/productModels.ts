import { ResultSetHeader } from 'mysql2';
import { Products } from '../interfaces/product.interface';
import connection from './connection';

const productsModels = {
  create: async (product: Products) => {
    const { name, amount } = product;
    const [data] = await connection.query<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?) ',
      [name, amount],
    );
    const { insertId } = data;
    return { id: insertId, ...product };
  },

  list: async () => {
    const [data] = await connection.query('SELECT * FROM Trybesmith.Products');
    return data;
  },

  update: async (productId: number, orderId: number) => {
    const [result] = await connection.query<ResultSetHeader>(
      'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?',
      [orderId, productId],
    );
    const { affectedRows } = result;
    return affectedRows;
  },
};

export default productsModels;