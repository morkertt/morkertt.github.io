import * as sinon from 'sinon';
import { expect } from 'chai';
import { Model } from 'mongoose';
import CarModel from '../../../models/CarModel';
import { singleCarByIdMock, singleCarMock } from '../mock/car.mock';

describe('Tests Car Model', () => {
  const carModel = new CarModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(singleCarByIdMock);
    sinon.stub(Model, 'findOne').resolves(singleCarByIdMock);
  });

  after(()=>{
    sinon.restore();
  })

  it('Successfully create a car', async () => {
    const newCar = await carModel.create(singleCarMock);

    expect(singleCarByIdMock).to.be.deep.equal(singleCarByIdMock);

  });

  it('Successfully read a car by Id', async () => {
    const singleCar = await carModel.readOne(singleCarByIdMock._id);

    expect(singleCar).to.be.deep.equal(singleCarByIdMock);

  });
});