import { Router } from 'express';
import MatchController from '../controller/match.controller';
import TokenValidation from '../middleware/token.validation.middleware';

const MatchRouter = Router();

const matchController = new MatchController();
const tokenValidation = new TokenValidation();

MatchRouter.get('/', matchController.getAll);
MatchRouter.post('/', tokenValidation.isValid, matchController.create);
MatchRouter.patch('/:id/finish', matchController.finishMatch);
MatchRouter.patch('/:id', matchController.setGoals);

export default MatchRouter;
