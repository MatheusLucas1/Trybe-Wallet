// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { THUNK_EXPENSE, SEARCH_SUCCESS } from '../actions';

const WALLET_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = WALLET_STATE, action) => {
  switch (action.type) {
  case SEARCH_SUCCESS:
    return {
      ...state,
      currencies: action.payload,
    };
  case THUNK_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  default:
    return state;
  }
};

export default wallet;
