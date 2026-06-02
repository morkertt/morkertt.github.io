import { Request, Response } from 'express';
import LeaderboardServices from '../service/leaderboard.service';

class LeaderboardController {
  private leaderboardServices: LeaderboardServices;

  constructor() {
    this.leaderboardServices = new LeaderboardServices();
  }

  public totalLeaderboard = async (_req: Request, resp: Response) => {
    const homeTeamleaderboard = await this.leaderboardServices.totalLeaderboard();
    return resp.status(200).json(homeTeamleaderboard);
  };

  public homeTeam = async (_req: Request, resp: Response) => {
    const homeTeamleaderboard = await this.leaderboardServices.leaderboardHome();
    return resp.status(200).json(homeTeamleaderboard);
  };

  public awayTeam = async (_req: Request, resp: Response) => {
    const awayTeamleaderboard = await this.leaderboardServices.leaderboardAway();
    return resp.status(200).json(awayTeamleaderboard);
  };
}

export default LeaderboardController;
