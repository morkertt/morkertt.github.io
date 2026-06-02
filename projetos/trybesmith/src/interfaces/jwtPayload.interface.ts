import { JwtPayload } from 'jsonwebtoken';

export interface JwtInterface extends JwtPayload {
  user: {
    id: number,
  }
}