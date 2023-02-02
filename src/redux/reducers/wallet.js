// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const WALLET_STATE = {
  currencies: [],
};

const wallet = (state = WALLET_STATE, action) => {
  switch (action.type) {
  case 'SEARCH_SUCCESS':
    return {
      ...state,
      currencies: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
