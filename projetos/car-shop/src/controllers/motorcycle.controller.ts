import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import IService from '../interfaces/IService';

export default class MotorcycleController {
  constructor(private _service: IService<IMotorcycle>) {}

  public async create(req: Request, resp: Response<IMotorcycle>) {
    const result = await this._service.create(req.body);
    return resp.status(201).json(result);
  }

  public async read(req: Request, resp: Response<IMotorcycle[]>) {
    const result = await this._service.read();
    return resp.status(200).json(result);
  } 
  
  public async readOne(req: Request, resp: Response<IMotorcycle>) {
    const result = await this._service.readOne(req.params.id);
    return resp.status(200).json(result);
  }

  public async update(req: Request, resp: Response<IMotorcycle>) {
    const { id } = req.params;
    const { status, model, year, color, buyValue, category, engineCapacity } = req.body;
    const body = { status, model, year, color, buyValue, category, engineCapacity };
    const result = await this._service.update(id, body);
    return resp.status(200).json(result);
  }

  public async delete(req: Request, resp: Response<IMotorcycle>) {
    const result = await this._service.delete(req.params.id);
    return resp.status(204).json(result);
  }
}