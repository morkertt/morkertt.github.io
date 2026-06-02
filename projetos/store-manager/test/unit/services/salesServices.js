const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');

describe('Sales Service - todos os produtos', () => {
  describe('Teste da função Sales quando encontra os produtos', () => {

    before(() => {
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
      sinon.stub(salesModel, 'getAll').resolves(data);
    });

    after(() => {
      salesModel.getAll.restore();
    })

    it('Verifica se o retorno é uma array de objetos', async () => {
      const sales = await salesService.getAllSales();
      expect(sales).to.be.a('array');
      sales.forEach((e) => {
        expect(e).to.be.a('object');
      })
    })
  })

  describe('Teste para quando a venda não é encontrada', () => {

    before(() => {
      const data = []
      sinon.stub(salesModel, 'getAll').resolves(data);
    });

    after(() => {
      salesModel.getAll.restore();
    })

    it('Verifica se o retorno é um array vazio', async () => {
      const sales = await salesService.getAllSales();
      expect(sales).to.be.a('array');
      expect(sales).to.have.length(0);
    })
  })
})

describe('Sales Service - Sale por id', () => {
  describe('Verifica o retorno da funcao por id', () => {

    before(() => {
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
        }
      ]
      sinon.stub(salesModel, 'getById').resolves(data);
    });

    after(() => {
      salesModel.getById.restore();
    })

    it('Verifica se o retorno é uma array', async () => {
      const sales = await salesService.getByIdSales(1);
      expect(sales).to.be.a('array');
    })

    it ('Verifica se é contem somente objetos', async () => {
      const sales = await salesService.getByIdSales(1);
      sales.forEach((e) => {
        expect(e).to.be.a('object');
      })
    })
  })
  describe('Contraprova para função ID', () => {

    before(() => {
      const data = false
      sinon.stub(salesModel, 'getById').resolves(data);
    });

    after(() => {
      salesModel.getById.restore();
    })
    
    it('Verifica retorno negativo da função', async () => {
      const salesList = await salesService.getByIdSales(1);
      expect(salesList).to.be.equals(false);
    })
  })
})