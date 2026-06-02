import { ResultSetHeader } from 'mysql2';
import connection from './connection';

const ordersModel = {
  list: async () => {
    const [data] = await connection.query<ResultSetHeader>(
      `SELECT o.id, o.userId, JSON_ARRAYAGG(p.id) as productsIds
      FROM Trybesmith.Orders as o
      INNER JOIN Trybesmith.Products as p on o.id = p.orderId
      GROUP BY o.id
      ORDER BY o.userId`,
    );
    return data;
  },

  create: async (userId: number) => {
    const [result] = await connection.query<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [userId],
    );
    const { insertId } = result;
    return insertId;
  },
};

export default ordersModel;