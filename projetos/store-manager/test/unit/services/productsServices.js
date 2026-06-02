const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../models/productsModel')
const productsService = require('../../../services/productsService');

describe('Products Service - todos os produtos', () => {
  describe('Teste da função Service quando encontra os produtos', () => {

    before(() => {
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
        }
      ]
      sinon.stub(productsModel, 'getAll').resolves(data);
    });

    after(() => {
      productsModel.getAll.restore();
    })

    it('Verifica se o retorno é um array de objetos', async () => {
      const products = await productsService.getAllProducts();
      expect(products).to.be.a('array');
      products.forEach((e) => {
        expect(e).to.be.a('object');
      })
    })
  })

  describe('Teste para quando o produto não é encontrado', () => {

    before(() => {
      const data = []
      sinon.stub(productsModel, 'getAll').resolves(data);
    });

    after(() => {
      productsModel.getAll.restore();
    })

    it('Verifica se o retorno é um array', async () => {
      const products = await productsService.getAllProducts();
      expect(products).to.be.a('array');
    });

    it('Verifica se o array está vazio', async () => {
      const products = await productsService.getAllProducts();
      expect(products).to.have.length(0);
    })
  })
})

describe('Products Service - call por id', () => {
  describe('Teste positivo da função por id', () => {

    before(() => {
      const data = [
        {
          "id": 1,
          "name": "Martelo de Thor",
          "quantity": 10
        }
      ]

      sinon.stub(productsModel, 'getById').resolves(data);
    });

    after(() => {
      productsModel.getById.restore();
    })

    it('Retorna um objeto', async () => {
      const result = await productsService.byIdProducts(1);
      expect(result).to.be.a('object');
    })

    it('Tem a chave "id", "name" e "quantity"', async () => {
      const result = await productsService.byIdProducts(1);
      expect(result).to.have.property('id');
      expect(result).to.have.property('name');
      expect(result).to.have.property('quantity');
    })
  })
  describe('Contraprova para função ID', () => {

    before (() => {
      const data = [[]];
      sinon.stub(productsModel, 'getById').resolves(data);
    })

    after(() => {
      productsModel.getById.restore();
    })

    it('Verifica se o retorno é uma array vazia', async () => {
      const result = await productsService.byIdProducts(1)
      expect(result).to.have.length(0);
    })
  })
})

describe('Products Service - inserindo produto', () => {
  describe('Teste caso o produto não esteja no DB', () => {
    const id = 99;
    const name = "teclado";
    const quantity = 20;
    before(() => {
      sinon.stub(productsModel, 'getByName').resolves([]);
      sinon.stub(productsModel, 'insertToDb').resolves(id);
    })

    after(() => {
      productsModel.getByName.restore();
      productsModel.insertToDb.restore();
    })

    it('Verifica o produto criado', async () => {
      const response = await productsService.insertProduct(name, quantity)
      expect(response).to.deep.equals({id, name, quantity})
    })
  })


  describe('Teste caso o produto já esteja no BD', () => {
    const name = "teclado"
    const quantity = 20
    before(() => {
      sinon.stub(productsModel, 'getByName').resolves(['produto X']);
    })

    after(() => {
      productsModel.getByName.restore();
    })

    it('Verifica o retorno negativo da função', async () => {
      const response = await productsService.insertProduct(name, quantity)
      expect(response).to.be.equals(false);
    })
  })
})