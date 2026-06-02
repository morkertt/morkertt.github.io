const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

describe('Products Model - todos os produtos', () => {
  describe('Teste da função Model quando encontra os produtos', () => {
    const data = [[{}]];

    before(async () => {
      sinon.stub(connection, 'execute').resolves(data)
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Verifica se o retorno é um array', async () => {
      const products = await productsModel.getAll();
      expect(products).to.be.a('array');
    });

    it('Verifica se o retorno é um array de objetos', async () => {
      const products = await productsModel.getAll();
      expect(products[0]).to.be.a('object');
    });
  });

  describe('Teste para quando o produto não é encontrado', async () => {
    const data = [[]];

    before(async () => {
      sinon.stub(connection, 'execute').resolves(data)
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Verifica se o retorno é um array', async () => {
      const products = await productsModel.getAll();
      expect(products).to.be.a('array');
    });

    it('Verifica se o array está vazio', async () => {
      const products = await productsModel.getAll();
      expect(products).to.have.length(0);
    })
  })
})

describe('Products Model - call por id', () => {
  describe('Teste positivo da função por id', () => {
    const data = [[{}]]

    before(async () => {
      sinon.stub(connection, 'execute').resolves(data)
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Verifica se o array retornado tem 1 de tamanho', async () => {
      const product = await productsModel.getById(1);
      expect(product).to.have.length(1);
    })

    it('Verifica se o retorno é um array', async () => {
      const products = await productsModel.getAll();
      expect(products).to.be.a('array');
    });

    it('Verifica se o array está vazio', async () => {
      const products = await productsModel.getAll();
      expect(Object.keys(products[0])).to.have.length(0);
    })
  })

  describe('Contraprova para função ID', () => {
    const data = [[{}]];

    before(async () => {
      sinon.stub(connection, 'execute').resolves(data)
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Verifica se o retorno é um array', async () => {
      const product = await productsModel.getById(1);
      expect(product).to.be.a('array');
    });

    it('Verifica se o array está vazio', async () => {
      const product = await productsModel.getById(1);
      expect(Object.keys(product[0])).to.have.length(0);
    })
  })
});

describe('Products Model - busca pelo nome', () => {
  describe('Teste de retorno para um produto cadastrado', () => {
    const data = [[
      {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      }
    ]];

    before(async () => {
      sinon.stub(connection, 'execute').resolves(data)
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Verifica se o retorno é uma array', async () => {
      const product = await productsModel.getByName('Martelo de Thor');
      expect(product).to.be.a('array');
    })

    it('Verifica se a array retornada contem Objetos', async () => {
      const product = await productsModel.getByName('Martelo de Thor');
      product.forEach((e) => {
        expect(e).to.be.a('object');
      })
    })

  })

  describe('Teste de retorno para um produto não cadastrado', () => {
    const data = [[]];

    before(async () => {
      sinon.stub(connection, 'execute').resolves(data)
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Verifica se o retorno é uma array vazia', async () => {
      const product = await productsModel.getByName('teclado');
      expect(product).to.be.a('array');
    })
  })
})

describe('Products Model - inserir no DB', () => {
  describe('Teste para inserção no DB com sucesso', () => {
    const name = "teclado";
    const quantity = 5;
    
    const data = [{"insertId": 7, "name": "teclado", "quantity": 5}]

    before(() => {
      sinon.stub(connection, 'execute').resolves(data)
    });
    
    after(() => {
      connection.execute.restore();
    });
    
    it('Verifica se é um objeto', async () => {
      const setOnDb = await productsModel.insertToDb(name, quantity);
      expect(setOnDb).to.be.equal(7);
    })

  })
  describe('Teste de falha na inserção', () => {
    const name = "teclado";
    const quantity = 5;

    const data = [{"insertId": [], "name": "teclado", "quantity": 5}]

    before(() => {
      sinon.stub(connection, 'execute').resolves(data)
    });
    
    after(() => {
      connection.execute.restore();
    });

    it('Verifica se deu erro no input', async () => {
      const setOnDb = await productsModel.insertToDb(name, quantity);
      expect(setOnDb).to.not.be.a('number');
    })
  })
});

describe('Products Model - update no DB', () => {
  describe('Testa o fracasso do update', () => {
    const id = [];
    const name = "teclado";
    const quantity = 5;
        
    before(() => {
      sinon.stub(connection, 'execute').resolves(name, quantity, id);
      sinon.stub(productsModel, 'getById').resolves([]);
    });
    
    after(() => {
      connection.execute.restore();
      productsModel.getById.restore();
    });

    it('', async () =>{
      const isOnDb = await productsModel.updateDb({ id , name, quantity });
      expect(isOnDb).to.be.true;
    })
  });
});
