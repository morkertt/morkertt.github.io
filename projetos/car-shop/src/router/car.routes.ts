import { Router } from 'express';
import CarController from '../controllers/car.controller';
import CarModel from '../models/CarModel';
import CarService from '../services/car.service';

const route = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

route.post('/cars', (req, resp) => carController.create(req, resp));
route.get('/cars', (req, resp) => carController.read(req, resp));
route.get('/cars/:id', (req, resp) => carController.readOne(req, resp));
route.put('/cars/:id', (req, resp) => carController.update(req, resp));
route.delete('/cars/:id', (req, resp) => carController.delete(req, resp));

export default route;