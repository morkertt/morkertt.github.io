import { ErrorTypes } from '../err/catalog';
import { carSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';

class CarService implements IService<ICar> {
  private _car: IModel<ICar>;
  constructor(model: IModel<ICar>) {
    this._car = model;
  }

  public async create(obj: unknown): Promise<ICar> {
    const parsedCar = carSchema.safeParse(obj);

    if (!parsedCar.success) throw parsedCar.error;

    return this._car.create(parsedCar.data);
  }

  public async read(): Promise<ICar[]> {
    const allCars = await this._car.read();
    return allCars;
  }

  public async readOne(_id: string): Promise<ICar> {
    const car = await this._car.readOne(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }

  public async update(_id: string, obj: unknown): Promise<ICar> {
    const carParsed = carSchema.safeParse(obj);

    if (!carParsed.success) throw carParsed.error;

    const car = await this._car.update(_id, carParsed.data);
    
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    
    return car;
  }

  public async delete(_id: string): Promise<ICar> {
    const deletedCar = await this._car.delete(_id);

    if (!deletedCar) throw new Error(ErrorTypes.EntityNotFound);
    
    return deletedCar;
  }
}

export default CarService;
