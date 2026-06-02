import { Router } from 'express';
import LeaderboardController from '../controller/leaderboard.controller';

const LeaderboardRouter = Router();

const leaderboardController = new LeaderboardController();

LeaderboardRouter.get('/', leaderboardController.totalLeaderboard);
LeaderboardRouter.get('/home', leaderboardController.homeTeam);
LeaderboardRouter.get('/away', leaderboardController.awayTeam);

export default LeaderboardRouter;
