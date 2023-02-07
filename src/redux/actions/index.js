// Coloque aqui suas actions
// ACTIONS TYPES
export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const THUNK_EXPENSE = 'THUNK_EXPENSE';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';

export const addEmail = (email) => (
  {
    type: 'ADD_EMAIL',
    payload: email,
  }
);

export const addExpense = (expense) => (
  {
    type: 'ADD_EXPENSES',
    payload: expense,
  }
);

export const searchSuccess = (currencies) => (
  { type: 'SEARCH_SUCCESS',
    payload: currencies,
  }
);

export function thunkCurrencies() {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const currencies = Object.keys(data).filter((_curr) => _curr !== 'USDT');
    dispatch(searchSuccess(currencies));
  };
}

export const thunkAction = (currencies) => (
  { type: 'THUNK_EXPENSE',
    payload: currencies,
  }
);

export function thunkExpenses(state) {
  console.log(state);
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    console.log(data);
    const newCurrency = state.currency;
    const findCurrency = Object.values(data).filter((curr) => curr.code === newCurrency);
    console.log(newCurrency);
    const conversionValue = findCurrency[0].ask;
    const valor = state.value * conversionValue;
    const valorReal = parseFloat(valor.toFixed(2));

    const object = {
      ...state,
      exchangeRates: data,
    };

    dispatch(thunkAction(object));
    dispatch(addExpense(valorReal));
  };
}
