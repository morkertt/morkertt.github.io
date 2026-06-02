import * as sinon from 'sinon';
import { expect } from 'chai';
import { Request, Response } from 'express';
import CarController from '../../../controllers/car.controller';
import CarService from '../../../services/car.service';
import CarModel from '../../../models/CarModel';
import { singleCarByIdMock, singleCarMock } from '../mock/car.mock';

describe('Tests Car Controller', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);
  const req = {} as Request; 
  const resp = {} as Response;

  before(async () => {
    sinon.stub(carService, 'create').resolves(singleCarMock);
    sinon.stub(carService, 'readOne').resolves(singleCarMock);

    resp.status = sinon.stub().returns(resp);
    resp.json = sinon.stub().returns(resp);
  });

  after(()=>{
    sinon.restore();
  })

  it('Successfully create a car', async () => {
    req.body = singleCarMock;
    await carController.create(req, resp);

    expect((resp.status as sinon.SinonStub).calledWith(201)).to.be.true;
    expect((resp.json as sinon.SinonStub).calledWith(singleCarMock)).to.be.true;

  });

  it('Successfully read a car by Id', async () => {
    req.params = { id: singleCarByIdMock._id };
    await carController.readOne(req, resp);

    expect((resp.status as sinon.SinonStub).calledWith(200)).to.be.true;
    expect((resp.json as sinon.SinonStub).calledWith(singleCarMock)).to.be.true;

  });
});