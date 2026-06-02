import { Products } from '../interfaces/product.interface';
import productsModels from '../models/productModels';

const productServices = {
  create: async (product: Products) => productsModels.create(product),
  
  list: async () => productsModels.list(),

  update: async (productId:number, orderId:number) => {
    await productsModels.update(productId, orderId);
  },
};

export default productServices;