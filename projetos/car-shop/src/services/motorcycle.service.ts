import { ErrorTypes } from '../err/catalog';
import { IModel } from '../interfaces/IModel';
import { IMotorcycle, motorcycleSchema } from '../interfaces/IMotorcycle';
import IService from '../interfaces/IService';

class MotorcycleService implements IService<IMotorcycle> {
  private _motorcycle: IModel<IMotorcycle>;

  constructor(model: IModel<IMotorcycle>) {
    this._motorcycle = model;
  }

  public async create(obj: unknown): Promise<IMotorcycle> {
    const parsedMoto = motorcycleSchema.safeParse(obj);

    if (!parsedMoto.success) throw parsedMoto.error;

    return this._motorcycle.create(parsedMoto.data);
  }

  public async read(): Promise<IMotorcycle[]> {
    const allMotos = await this._motorcycle.read();
    return allMotos;
  }

  public async readOne(_id: string): Promise<IMotorcycle> {
    const moto = await this._motorcycle.readOne(_id);
    if (!moto) throw new Error(ErrorTypes.EntityNotFound);
    return moto;
  }

  public async update(_id: string, obj: unknown): Promise<IMotorcycle> {
    const motoParsed = motorcycleSchema.safeParse(obj);

    if (!motoParsed.success) throw motoParsed.error;

    const moto = await this._motorcycle.update(_id, motoParsed.data);
    
    if (!moto) throw new Error(ErrorTypes.EntityNotFound);
    
    return moto;
  }

  public async delete(_id: string): Promise<IMotorcycle> {
    const deletedMoto = await this._motorcycle.delete(_id);

    if (!deletedMoto) throw new Error(ErrorTypes.EntityNotFound);
    
    return deletedMoto;
  }
}
export default MotorcycleService;
