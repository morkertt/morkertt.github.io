const sinon = require('sinon');
const { expect } = require('chai');

const productsController = require('../../../controllers/productsController');
const productsService = require('../../../services/productsService');


describe('Products Controllers - todos os produtos', () => {
  describe('Teste da função controller quando encontra os produtos', () => {
    const request = {}
    const response = {}
    const data = [
      {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      },
      {
        "id": 2,
        "name": "Traje de encolhimento",
        "quantity": 20
      },
      {
        "id": 3,
        "name": "Escudo do Capitão América",
        "quantity": 30
      }
    ]

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'getAllProducts').resolves(data)
    })

    after(() => {
      productsService.getAllProducts.restore();
    })

    it('Esperado retorno de codigo 200 e os produtos', async () => {
      await productsController.getAllProductsController(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(data)).to.be.equal(true);
    })
  })

  describe('Teste para quando o produto não é encontrado', () => {
    const response = {}
    const request = {};
    const next = () => {};
    const error = { status: 404, message: 'not found' };

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'getAllProducts').throws(error);
    });

    after(() => {
      productsService.getAllProducts.restore();
    })

    it('Deverá retornar error 404 e "not found"', async () => {
      await productsController.getAllProductsController(request, response, next);

      expect(response.status.calledWith(404)).to.be.equal(true);
      expect(response.json.calledWith({ message: 'not found' })).to.be.equal(true);
    })
  })
})

describe('Products Controllers - call por id', () => {
  describe('Teste positivo da função por id', () => {
    const request = {};
    const response = {};
    const data = {
      "id": 1,
      "name": "Martelo de Thor",
      "quantity": 10
    }
    
    before(() => {
      request.params = { id: 1 }
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'byIdProducts').resolves(data)
    });

    after(() => {
      productsService.byIdProducts.restore();
    });

    it('Esperado codigo 200 e produto', async () => {
      await productsController.byIdProductsController(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(data)).to.be.equal(true);
    })
  })

  describe('Contraprova para função ID', () => {
    const request = {};
    const response = {};
    const data = false;

    before(() => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'byIdProducts').resolves(data)
    })

    after(() => {
      productsService.byIdProducts.restore();
    })

    it('Esperado codigo 404 e menssagem de erro', async () => {
      await productsController.byIdProductsController(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
      expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
    })
  })
})