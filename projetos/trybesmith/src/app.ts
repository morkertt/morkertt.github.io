import express from 'express';
import 'express-async-errors';
import productsRoutes from './router/product.routes';
import usersRoutes from './router/users.routes';
import ordersRoutes from './router/orders.routes';
import login from './router/login.routes';
import handleErr from './middlewares/errorMiddeware';

const app = express();

app.use(express.json());
app.use(productsRoutes);
app.use(usersRoutes);
app.use(ordersRoutes);
app.use(login);
app.use(handleErr);

export default app;
