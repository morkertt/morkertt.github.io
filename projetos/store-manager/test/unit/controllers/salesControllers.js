const { expect } = require('chai');
const sinon = require('sinon');

const salesController = require('../../../controllers/salesController');
const salesServices = require('../../../services/salesService');

describe('Sales Controllers - todos os produtos', () => {
  describe('Teste da função sales quando encontra os produtos', () => {
    const response = {}
    const request = {}
    const data = [
      {
        "saleId": 1,
        "date": "2022-06-14T17:50:11.000Z",
        "productId": 1,
        "quantity": 5
      },
      {
        "saleId": 1,
        "date": "2022-06-14T17:50:11.000Z",
        "productId": 2,
        "quantity": 10
      },
      {
        "saleId": 2,
        "date": "2022-06-14T17:50:11.000Z",
        "productId": 3,
        "quantity": 15
      }
    ]

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesServices, 'getAllSales').resolves(data);
    })

    after(() => {
      salesServices.getAllSales.restore();
    })

    it('Esperado retorno de codigo 200', async () => {
      await salesController.getAllSalesController(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    })
  })
  describe('Teste para quando a venda não é encontrada', () => {
    const response = {}
    const request = {};
    const next = () => {};
    const error = { status: 404, message: 'not found' };

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesServices, 'getAllSales').throws(error);
    });

    after(() => {
      salesServices.getAllSales.restore();
    })

    it('Deverá retornar error 404 e "not found"', async () => {
      await salesController.getAllSalesController(request, response, next);

      expect(response.status.calledWith(404)).to.be.equal(true);
    })
  })
})

describe('Sales Controllers - call por id', () => {
  describe('Teste positivo da função por id', () => {
    const response = {};
    const request = {};
    const data = [
      {
        "date": "2022-06-14T17:50:11.000Z",
        "productId": 1,
        "quantity": 5
      }
    ]

    before(() => {
      request.params = { id: 1 }
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesServices, 'getByIdSales').resolves(data)
    });

    after(() => {
      salesServices.getByIdSales.restore();
    });

    it('Esperado codigo 200 e a venda', async () => {
      await salesController.getByIdSalesController(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(data)).to.be.equal(true);
    })
  })
  describe('Contraprova para função ID', () => {
    const request = {};
    const response = {};
    const data = false;

    before(() => {
      request.params = { id: 1 }
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesServices, 'getByIdSales').resolves(data)
    });

    after(() => {
      salesServices.getByIdSales.restore();
    });

    it('Esperado codigo 404', async () => {
      await salesController.getByIdSalesController(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    })
  })
})

describe('Service Controllers - Criar uma venda', () => {
  const request = {};
  const response = {};
  const data = {
    "id": 3,
    "name": "Guarana",
    "quantity": 5
  };

  before(() => {
    request.body = {
    "name": "Guarana",
    "quantity": 5
    }
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    sinon.stub(salesServices, 'createSales').resolves(data)
  })
  
  after(() => {
    salesServices.createSales.restore();
  })

  it('Esperado codigo 201 e a venda que foi adicionada', async () => {
    await salesController.createSalesController(request, response);
    expect(response.status.calledWith(201)).to.be.equal(true);
    expect(response.json.calledWith(data)).to.be.equal(true);
  })
})

describe('Service Controllers - Atualizar venda', () => {
  describe('Teste positivo da função atualizar venda', () => {
    const request = {};
    const response = {};
    const data = {
      "saleId": 1,
      "itemUpdated": [
        {
         "productId": 1 ,
         "quantity": 3
        }
      ]
    }
    before(() => {
      request.params = { id: 1 };
      request.body = [{
      "productId": 1,
      "quantity": 3
      }]
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesServices, 'updateSales').resolves(data)
    })
    
    after(() => {
      salesServices.updateSales.restore();
    })

    it('Esperado codigo 200 e a venda atualizada', async () => {
      await salesController.updateSalesController(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    })
  })

  describe('Contraprova para função de atualizar venda', () => {
    const request = {};
    const response = {};
    const data = false;
    
    before(() => {
      request.params = { id: 1 };
      request.body = [{
        "productId": 1,
        "quantity": 3
      }]
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesServices, 'updateSales').resolves(data);
    })
    
    after(() => {
      salesServices.updateSales.restore();
    })

    it('Esperado codigo 404 e menssagem de erro', async () => {

      await salesController.updateSalesController(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
      expect(response.json.calledWith({ message: 'Sale not found'})).to.be.equal(true)
    })

  })
})
