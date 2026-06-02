import { Router } from 'express';
import productController from '../controller/productController';
import validateSchema from '../middlewares/productValidation';

const router = Router();

router.post('/products', validateSchema, productController.create);
router.get('/products', productController.list);

export default router;