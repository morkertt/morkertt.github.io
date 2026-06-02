import Team from './Team.inferface';

interface Match {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome: Team;
  teamAway: Team;
}

export default Match;
