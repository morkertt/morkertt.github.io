import ValidationsError from '../middleware/error';
import { TEAM_NOT_FOUND } from '../utils/constants';
import TeamModel from '../database/models/team.model';
import Team from '../interface/Team.inferface';
import AllValidations from '../utils/allValidations';

class TeamsServices {
  public allValidations: AllValidations;

  constructor() {
    this.allValidations = new AllValidations();
  }

  getAll = async (): Promise<Team[]> => {
    const teams = await TeamModel.findAll();
    return teams;
  };

  getById = async (id: number): Promise<Team> => {
    const isValid = await this.allValidations.idValidation(id);

    const teamById = await TeamModel.findOne({ where: { id: isValid } });

    if (!teamById) throw new ValidationsError(400, TEAM_NOT_FOUND);
    return teamById;
  };
}

export default TeamsServices;
