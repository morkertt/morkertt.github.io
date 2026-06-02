const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');

describe('Sales Model - todos os produtos', () => {
  describe('Teste da função sales quando encontra os produtos', () => {

    before(() => {
      const data = [[
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
      ]]
      sinon.stub(connection, 'execute').resolves(data)
    });

    after(() => {
      connection.execute.restore();
    });

    it('Verifica se o retorno é uma array', async () => {
      const sales = await salesModel.getAll();
      expect(sales).to.be.a('array');
    });

    it('Verifica se na array de retorno só contem objetos', async () => {
      const sales = await salesModel.getAll();
      sales.forEach((e) => {
        expect(e).to.be.a('object')
      })
    });

    it('Verifica se o Objeto não está vazio', async () => {
      const sales = await salesModel.getAll();
      expect(Object.keys(sales[0])).to.have.length.above(0);
    } )
  })

  describe('Teste para quando a venda não é encontrada', async () => {

    before(() => {
      const data = [[]];
      sinon.stub(connection, 'execute').resolves(data)
    });

    after(() => {
      connection.execute.restore();
    });

    it('Verifica se o retorno é uma array', async () => {
      const sales = await salesModel.getAll();
      expect(sales).to.be.a('array');
    });

    it('Verifica se a array está vazio', async () => {
      const sales = await salesModel.getAll();
      expect(sales).to.have.length(0);
    })
  })
})

describe('Sales Model - Sale por id', () => {
  describe('Verifica o retorno da funcao por id', () => {

    before(() => {
      const data = [[
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
      ]]
      sinon.stub(connection, 'execute').resolves(data);
    })

    after(() => {
      connection.execute.restore();
    })

    it('Verifica se o retorno é uma array de objetos', async () => {
      const result = await salesModel.getById(1);
      expect(result).to.be.a('array');
      result.forEach((e) => {
        expect(e).to.be.a('object');
      })
    })
  })

  describe('Contraprova para função ID', () => {

    before(() => {
      const data = [[]];
      sinon.stub(connection, 'execute').resolves(data);
    })

    after(() => {
      connection.execute.restore();
    })

    it('Retorna um array vazio', async () => {
      const result = await salesModel.getById(1);
      expect(result).to.be.a('array');
      expect(result).to.have.length(0);
    })
  })
})