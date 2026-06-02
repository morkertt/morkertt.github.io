import AwayTeam from '../utils/AwayTeam.utils';
import HomeTeam from '../utils/homeTeam.utils';
import {
  sortLeader, HomeTeamCalculation, AwayTeamCalculation, awayHomeSum,
} from '../utils/leaderboard.utils';
import { LeaderboardTeam } from '../interface/LeaderBoardTeamInterface';
import MatchService from './match.service';
import TeamsServices from './teams.service';

export default class LeaderboardServices {
  private teamsServices : TeamsServices;
  private matchServices : MatchService;

  constructor() {
    this.teamsServices = new TeamsServices();
    this.matchServices = new MatchService();
  }

  public totalLeaderboard = async () => {
    const allTeams = await this.teamsServices.getAll();
    const allFinishedMatches = await this.matchServices.getFiltered(false);

    const homeLeader: LeaderboardTeam[] = [];
    const awayLeader: LeaderboardTeam[] = [];

    allTeams.forEach((team) => {
      homeLeader.push(new HomeTeam(team.teamName));
    });
    allTeams.forEach((team) => {
      awayLeader.push(new AwayTeam(team.teamName));
    });

    HomeTeamCalculation(allFinishedMatches, homeLeader);
    AwayTeamCalculation(allFinishedMatches, awayLeader);
    awayHomeSum(homeLeader, awayLeader);
    return homeLeader;
  };

  public leaderboardHome = async () => {
    const allTeams = await this.teamsServices.getAll();
    const allFinishedMatches = await this.matchServices.getFiltered(false);
    const homeLeader: LeaderboardTeam[] = [];

    allTeams.forEach((team) => {
      homeLeader.push(new HomeTeam(team.teamName));
    });

    HomeTeamCalculation(allFinishedMatches, homeLeader);
    homeLeader.forEach((team) => team.addEfficiency(team.totalPoints, team.totalGames));
    sortLeader(homeLeader);
    return homeLeader;
  };

  public leaderboardAway = async () => {
    const allTeams = await this.teamsServices.getAll();
    const allFinishedMatches = await this.matchServices.getFiltered(false);
    const awayLeader: LeaderboardTeam[] = [];

    allTeams.forEach((team) => {
      awayLeader.push(new AwayTeam(team.teamName));
    });

    AwayTeamCalculation(allFinishedMatches, awayLeader);
    awayLeader.forEach((team) => team.addEfficiency(team.totalPoints, team.totalGames));
    sortLeader(awayLeader);
    return awayLeader;
  };
}
