import express from 'express';
import 'express-async-errors';
import carRouter from './router/car.routes';
import motoRouter from './router/motorcycle.routes';
import errorHandler from './middleware/error';

const app = express();
app.use(express.json());
app.use(carRouter);
app.use(motoRouter);
app.use(errorHandler);

export default app;
