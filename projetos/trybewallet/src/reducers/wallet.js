// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SUCCESS_RESPONSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SUCCESS_RESPONSE:
    return {
      ...state,
      expenses: [...state.expenses, action.info],
    };
  default:
    return state;
  }
}

export default wallet;
