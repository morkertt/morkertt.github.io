import { Request, Response } from 'express';
import AllValidations from '../utils/allValidations';
import { FINISHED } from '../utils/constants';
import MatchService from '../service/match.service';

export default class MatchController {
  private matchService: MatchService;
  private allValidations: AllValidations;

  constructor() {
    this.matchService = new MatchService();
    this.allValidations = new AllValidations();
  }

  public getAll = async (req: Request, resp: Response) => {
    const { inProgress } = req.query;

    if (typeof inProgress === 'string') {
      const isInProgress = inProgress.toLowerCase() === 'true';
      const filteredMatches = await this.matchService.getFiltered(isInProgress);
      return resp.status(200).json(filteredMatches);
    }

    const allMatches = await this.matchService.getAll();
    return resp.status(200).json(allMatches);
  };

  public create = async (req: Request, resp: Response) => {
    const { body } = req;
    body.inProgress = true;

    await this.allValidations.areEquals(body);
    await this.allValidations.teamExists(body);

    const create = await this.matchService.create(body);

    return resp.status(201).json(create);
  };

  public finishMatch = async (req: Request, resp: Response) => {
    const { id } = req.params;
    const updatedMatch = await this.matchService.finishMatch(+id);

    if (updatedMatch) {
      resp.status(200).json({ message: FINISHED });
    }
  };

  public setGoals = async (req: Request, resp: Response) => {
    const { params, body } = req;
    const { id } = params;
    const goals = await this.matchService.setGoals(+id, body);
    return resp.status(200).json({ goals });
  };
}
