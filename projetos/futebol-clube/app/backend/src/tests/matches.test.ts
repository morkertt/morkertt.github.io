import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

import Match from '../database/models/matches.model';
import { teamMock, mockDiff, matchesFinalized, matchesInProgress } from '../utils/matches.utils';
import { validUser, validLogin } from '../utils/login.utils';
import { teams } from '../utils/teams.utils';
import User from '../database/models/user.model';
import Team from '../database/models/team.model';
import { EMPTY_FIELD, FINISHED, INCORRECT_MATCH, INVALID_TOKEN, TEAM_ID_NOT_FOUND, TWO_EQUAL_TEAMS } from '../utils/constants';

chai.use(chaiHttp);

const { expect } = chai;

describe('Route Matches', () => {
  let chaiHttpResponse: Response;

  afterEach(() => sinon.restore());

  describe('Route GET for match', () => {
    it('Tests if returns status 200 and check return', async () => {
      sinon.stub(Match, "findAll").resolves(mockDiff as []);

      chaiHttpResponse = await chai.request(app).get('/matches');
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(mockDiff);
    })

    it('Tests if returns status 200 and check if matches are "inProgress"', async () => {
      sinon.stub(Match, "findAll").resolves(matchesInProgress as []);

      chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(matchesInProgress);
    })

    it('Tests if returns status 200 and checks if matches are "Finalized"', async () => {
      sinon.stub(Match, "findAll").resolves(matchesFinalized as []);

      chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal(matchesFinalized);
    })
  })

  describe('Route POST for match', () => {
    it('Test when create a match if returns status 201 and match created', async () => {
      sinon.stub(Match, "create").resolves(teamMock as Match);
      sinon.stub(User, "findOne").resolves(validUser as User);
      sinon.stub(Team, "findOne")
        .withArgs({ where: { id: teamMock.homeTeam } })
        .resolves(teams[0] as Team)
        .withArgs({ where: { id: teamMock.awayTeam } })
        .resolves(teams[1] as Team);
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(validLogin);
      const { token } = chaiHttpResponse.body;

      chaiHttpResponse = await chai.request(app)
        .post('/matches')
        .set('Authorization', token)
        .send({
          "homeTeam": teamMock.homeTeam,
          "awayTeam": teamMock.awayTeam,
          "homeTeamGoals": teamMock.homeTeamGoals,
          "awayTeamGoals": teamMock.awayTeamGoals
        });
      expect(chaiHttpResponse.status).to.equal(201);
      expect(chaiHttpResponse.body).to.deep.equal(teamMock);
    })

    it('Tests when token is invalid, should returns 401 and "Token must be a valid token"', async () => {
      sinon.stub(Match, "create").resolves(teamMock as Match);

      chaiHttpResponse = await chai.request(app)
        .post('/matches')
        .set('Authorization', 'token_invalido')
        .send({
          "homeTeam": teamMock.homeTeam,
          "awayTeam": teamMock.awayTeam,
          "homeTeamGoals": teamMock.homeTeamGoals,
          "awayTeamGoals": teamMock.awayTeamGoals
        });
      expect(chaiHttpResponse.status).to.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal(INVALID_TOKEN);
    })

    it('Tests when missing a field returns 400 and message "All fields must be filled"', async () => {
      sinon.stub(Match, "create").resolves(teamMock as Match);
      sinon.stub(User, "findOne").resolves(validUser as User);

      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(validLogin);
      const { token } = chaiHttpResponse.body;

      chaiHttpResponse = await chai.request(app)
        .post('/matches')
        .set('Authorization', token)
        .send({});
      expect(chaiHttpResponse.status).to.equal(400);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal(EMPTY_FIELD);
    })

    it('Tests if "homeTeam" and "awayTeam" are the same', async () => {
      sinon.stub(Match, "create").resolves(teamMock as Match);
      sinon.stub(User, "findOne").resolves(validUser as User);

      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(validLogin);
      const { token } = chaiHttpResponse.body;

      chaiHttpResponse = await chai.request(app)
        .post('/matches')
        .set('Authorization', token)
        .send({
          "homeTeam": 1,
          "awayTeam": 1,
          "homeTeamGoals": teamMock.homeTeamGoals,
          "awayTeamGoals": teamMock.awayTeamGoals
        });
      expect(chaiHttpResponse.status).to.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal(TWO_EQUAL_TEAMS);
    })

    it('Tests if teams id does not exists returns status 401 and message "There is no team with such id!"', async () => {
      sinon.stub(Match, "create").resolves(teamMock as Match);
      sinon.stub(User, "findOne").resolves(validUser as User);
      sinon.stub(Team, "findOne").resolves(null);

      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(validLogin);
      const { token } = chaiHttpResponse.body;
      chaiHttpResponse = await chai.request(app)
        .post('/matches')
        .set('Authorization', token)
        .send({
          "homeTeam": 1623,
          "awayTeam": 651654,
          "homeTeamGoals": teamMock.homeTeamGoals,
          "awayTeamGoals": teamMock.awayTeamGoals
        });
      expect(chaiHttpResponse.status).to.equal(404);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal(TEAM_ID_NOT_FOUND);
    })
  })

  describe('Route PATCH for match', () => {
    it('Tests if match was altered to finalized and returns status 201 and message "Finished"', async () => {
      sinon.stub(Match, "update").resolves();
      sinon.stub(User, "findOne").resolves(validUser as User);

      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(validLogin);
      const { token } = chaiHttpResponse.body;

      chaiHttpResponse = await chai.request(app)
        .patch('/matches/1/finish')
        .set('Authorization', token)
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal(FINISHED);
    })

    it('Tests invalid id and returns status 400 and message "Match does not exist"', async () => {
      sinon.stub(Match, "update").resolves();
      sinon.stub(User, "findOne").resolves(validUser as User);

      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(validLogin);
      const { token } = chaiHttpResponse.body;

      chaiHttpResponse = await chai.request(app)
        .patch('/matches/borabill/finish')
        .set('Authorization', token)
      expect(chaiHttpResponse.status).to.equal(400);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal(INCORRECT_MATCH);
    })

    it('Tests if when token is invalid, returns 401 and message "Token must be a valid token"', async () => {
      chaiHttpResponse = await chai.request(app)
        .patch('/matches/1/finish')
        .set('Authorization', 'token_invalido')
      expect(chaiHttpResponse.status).to.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal(INVALID_TOKEN);
    })
  })

  describe('Route PATCH for match by id', () => {
    it('Tests if match goals are updated and returns status 200', async () => {
      sinon.stub(Match, "update").resolves();
      sinon.stub(Match, "findOne").resolves(teamMock as Match);
      sinon.stub(User, "findOne").resolves(validUser as User);

      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(validLogin);
      const { token } = chaiHttpResponse.body;

      chaiHttpResponse = await chai.request(app)
        .patch('/matches/1')
        .set('Authorization', token)
        .send({
          "homeTeamGoals": 3,
          "awayTeamGoals": 1
        })
      expect(chaiHttpResponse.status).to.equal(200);
    })

    it('Tests if invalid id returns status 400 and message "Match does not exist"', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(validLogin);
      const { token } = chaiHttpResponse.body;

      chaiHttpResponse = await chai.request(app)
        .patch('/matches/borabill')
        .set('Authorization', token)
      expect(chaiHttpResponse.status).to.equal(400);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal(INCORRECT_MATCH);
    })

    it('Tests if invalid body returns 400 and message "All fields must be filled"', async () => {
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(validLogin);
      const { token } = chaiHttpResponse.body;

      chaiHttpResponse = await chai.request(app)
        .patch('/matches/1')
        .set('Authorization', token)
      expect(chaiHttpResponse.status).to.equal(400);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal(EMPTY_FIELD);
    })

    it('Tests when Match Id is not found, returns 404 and message "Match does not exist"', async () => {
      sinon.stub(Match, "findOne").resolves(null);
      sinon.stub(User, "findOne").resolves(validUser as User);

      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(validLogin);
      const { token } = chaiHttpResponse.body;

      chaiHttpResponse = await chai.request(app)
        .patch('/matches/1')
        .set('Authorization', token)
        .send({
          "homeTeamGoals": 3,
          "awayTeamGoals": 1
        })
      expect(chaiHttpResponse.status).to.equal(404);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal(INCORRECT_MATCH);
    })

    it('Tests when token is invalid returns 401 and message "Token must be a valid token"', async () => {
      chaiHttpResponse = await chai.request(app).patch('/matches/1')

      expect(chaiHttpResponse.status).to.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal(INVALID_TOKEN);
    })
  })
})