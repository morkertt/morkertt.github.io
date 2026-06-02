import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { INVALID_TOKEN, EMPTY_FIELD, INCORRECT_FIELD } from '../utils/constants';

import { app } from '../app';
import { validLogin, invalidLogin, validUser } from '../utils/login.utils'
import { Response } from 'superagent';
import UsersModel from '../database/models/user.model';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login Test', () => { 
  let chaiHttpResponse: Response;

  afterEach(() => sinon.restore());
  
  describe('Route post for login', () => {
    beforeEach(async () => {
      sinon.stub(UsersModel, "findOne")
      .withArgs({ where: {email: validLogin.email}})
      .resolves(validUser as UsersModel)
      .withArgs({where: {email: invalidLogin.email}})
      .resolves(null);
    });
  })

  it('Test if return status 200 and token', async () => {
    chaiHttpResponse = await chai.request(app)
    .post('/login')
    .send(validLogin);
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('Test when req contains only email, returns status 400 and empty email message', async () => {
    chaiHttpResponse = await chai.request(app)
    .post('/login')
    .send({ password: validLogin.password });
    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.equal(EMPTY_FIELD);
  });

  it('Test when req contains only password, returns status 400 and empty password message', async () => {
    chaiHttpResponse = await chai.request(app)
    .post('/login')
    .send({ email: validLogin.email });
    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.equal(EMPTY_FIELD);
  });
  
  it('Test when req contains invalid email, returns status 401 and incorrect field message', async () => {
    chaiHttpResponse = await chai.request(app)
    .post('/login')
    .send({ email: invalidLogin.email, password: validLogin.password });
    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.equal(INCORRECT_FIELD);
  });

  it('Test when req contains invalid password, returns status 401 and incorrect field message', async () => {
    chaiHttpResponse = await chai.request(app)
    .post('/login')
    .send({ email: validLogin.email, password: invalidLogin.password });
    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.equal(INCORRECT_FIELD);
  });

  describe('Route validate for login', () => {
    it('Test when token is valid, return status 200 and user role', async () => {
      sinon.stub(UsersModel, "findOne").resolves(validUser as UsersModel);

      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(validLogin);
      const { token } = chaiHttpResponse.body;

      chaiHttpResponse = await chai.request(app)
        .get('/login/validate')
        .set('Authorization', token);
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.have.property('role');
      expect(chaiHttpResponse.body.role).to.be.equal('admin');
    })

    it('Test when token is invalid, returns status 401 and invalid token message', async () => {
      chaiHttpResponse = await chai.request(app)
        .get('/login/validate')
        .set('Authorization', 'authorizationByMegaZord');
      expect(chaiHttpResponse.status).to.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal(INVALID_TOKEN);
    })
  })
});
