import { Request, Response } from 'express';
import orderValidate from '../middlewares/ordersValidation';
import tokenIsValid from '../middlewares/tokenValide';
import authService from '../services/authService';
import ordersService from '../services/ordersService';
import productServices from '../services/productServices';

const ordersController = {
  list: async (req: Request, resp: Response) => {
    const data = await ordersService.list();
    return resp.status(200).json(data);
  },

  create: async (req: Request, resp: Response) => {
    const auth = await tokenIsValid(req);
    const userId = authService.valideToken(auth);
    const { productsIds } = await orderValidate(req);
    const orderId = await ordersService.create(userId);

    await Promise.all(productsIds.map((id:number) => 
      productServices.update(id, orderId)));
      
    return resp.status(201).json({ userId, productsIds });
  },
};

export default ordersController;