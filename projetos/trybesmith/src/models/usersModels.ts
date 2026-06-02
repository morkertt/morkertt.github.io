import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Login } from '../interfaces/login.interface';
import { Users } from '../interfaces/users.interface';
import connection from './connection';

const usersModels = {
  create: async (user: Users) => {
    const { username, classe, level, password } = user;
    const [result] = await connection.query<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, `level`, password) VALUES (?,?,?,?)', 
      [username, classe, level, password],
    );
    const { affectedRows } = result;
    return affectedRows;
  },

  getByUser: async (user: Login) => {
    const { username, password } = user;
    const [[result]] = await connection.query<RowDataPacket[]>(`
      SELECT * FROM Trybesmith.Users
      WHERE username = "${username}" AND password = "${password}"
    `);
    return result;
  },

  isValid: async (user: Login) => {
    const { username, password } = user;
    const [[result]] = await connection.query<RowDataPacket[]>(`
    SELECT 1 FROM Trybesmith.Users WHERE username = '${username}' AND password = '${password}'
    `);
    return result;
  },
};

export default usersModels;