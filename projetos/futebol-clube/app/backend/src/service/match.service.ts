import CreateMatch from '../interface/MatchCreation.interface';
import { INCORRECT_MATCH, MATCH_UPDATED } from '../utils/constants';
import ValidationsError from '../middleware/error';
import Match from '../interface/Match.interface';
import TeamModel from '../database/models/team.model';
import MatchesModel from '../database/models/matches.model';
import MatchGoals from '../interface/MatchGoals.interface';

export default class MatchService {
  public getAll = async (): Promise<Match[]> => {
    const allMatches = await MatchesModel.findAll({
      include: [
        { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return allMatches;
  };

  getFiltered = async (params: boolean): Promise<Match[]> => {
    const filteredMatches = await MatchesModel.findAll({
      where: { inProgress: params },
      include: [
        { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return filteredMatches;
  };

  finishMatch = async (id: number) => {
    const findById = await MatchesModel.findOne({ where: { id } });

    if (!findById) throw new ValidationsError(404, INCORRECT_MATCH);

    await MatchesModel.update({ inProgress: false }, { where: { id } });

    return true;
  };

  create = async (body: CreateMatch): Promise<Match> => {
    const createdMatch = await MatchesModel.create(body);
    return createdMatch;
  };

  setGoals = async (id: number, body: MatchGoals) => {
    const matchById = await MatchesModel.findOne({ where: { id } });

    if (!matchById) throw new ValidationsError(404, INCORRECT_MATCH);

    const { homeTeamGoals, awayTeamGoals } = body;

    await MatchesModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return MATCH_UPDATED;
  };
}
