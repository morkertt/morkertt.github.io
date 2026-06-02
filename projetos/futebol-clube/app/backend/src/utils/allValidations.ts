import Joi = require('joi');
import TeamModel from '../database/models/team.model';
import CreateMatch from '../interface/MatchCreation.interface';
import ValidationsError from '../middleware/error';
import { INVALID_ID, TEAM_ID_NOT_FOUND, TWO_EQUAL_TEAMS } from './constants';

export default class AllValidations {
  public idValidation = async (id: number) => {
    const schema = Joi.number().required();
    const { error } = schema.validate(id);

    if (error) throw new ValidationsError(400, INVALID_ID);

    return id;
  };

  public areEquals = async (body: CreateMatch) => {
    const { homeTeam, awayTeam } = body;
    if (homeTeam === awayTeam) throw new ValidationsError(401, TWO_EQUAL_TEAMS);
  };

  public teamExists = async (body: CreateMatch) => {
    const { homeTeam, awayTeam } = body;
    const findHomeTeam = await TeamModel.findOne({ where: { id: homeTeam } });
    const findAwayTeam = await TeamModel.findOne({ where: { id: awayTeam } });

    if (!findHomeTeam || !findAwayTeam) throw new ValidationsError(404, TEAM_ID_NOT_FOUND);
  };
}
