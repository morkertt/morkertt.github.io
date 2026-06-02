import { Router } from 'express';
import MotorcycleController from '../controllers/motorcycle.controller';
import Motorcycles from '../models/MotorcycleModel';
import MotorcycleService from '../services/motorcycle.service';

const route = Router();

const moto = new Motorcycles();
const motoService = new MotorcycleService(moto);
const motoController = new MotorcycleController(motoService);

const MOTO_ROUTE = '/motorcycles';
const MOTO_ID_ROUTE = '/motorcycles/:id';

route.post(MOTO_ROUTE, (req, resp) => motoController.create(req, resp));
route.get(MOTO_ROUTE, (req, resp) => motoController.read(req, resp));
route.get(MOTO_ID_ROUTE, (req, resp) => motoController.readOne(req, resp));
route.put(MOTO_ID_ROUTE, (req, resp) => motoController.update(req, resp));
route.delete(MOTO_ID_ROUTE, (req, resp) => motoController.delete(req, resp));

export default route;