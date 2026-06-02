import { Router } from 'express';
import ordersController from '../controller/ordersController';

const orders = Router();

orders.get('/orders', ordersController.list);
orders.post('/orders', ordersController.create);

export default orders;