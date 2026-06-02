import { Request, Response } from 'express';
import { Products } from '../interfaces/product.interface';
import productServices from '../services/productServices';

const productController = {
  create: async (req: Request, resp: Response) => {
    const product = req.body as Products;
    const result = await productServices.create(product);
    return resp.status(201).json(result);  
  },

  list: async (req: Request, resp: Response) => {
    const result = await productServices.list();
    return resp.status(200).json(result);
  },
};

export default productController;