import * as sinon from 'sinon';
import { expect } from 'chai';
import CarService from '../../../services/car.service';
import CarModel from '../../../models/CarModel';
import { singleCarByIdMock, singleCarMock } from '../mock/car.mock';

describe('Tests Car Controller', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon.stub(carModel, 'create').resolves(singleCarByIdMock);
    sinon.stub(carModel, 'readOne').resolves(singleCarByIdMock);
  });

  after(()=>{
    sinon.restore();
  })

  it('Successfully create a car', async () => {
    const newCar = await carService.create(singleCarMock);

    expect(newCar).to.be.deep.equal(singleCarByIdMock);
  });

  it('Successfully read a car by Id', async () => {
    const newCar = await carService.readOne(singleCarByIdMock._id);

    expect(newCar).to.be.deep.equal(singleCarByIdMock);
  });
});