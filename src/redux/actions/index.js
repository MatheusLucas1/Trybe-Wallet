// Coloque aqui suas actions
// ACTIONS TYPES
const API = 'https://economia.awesomeapi.com.br/json/all';

export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
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

export const removeExpense = (expense) => (
  {
    type: 'REMOVE_EXPENSE',
    payload: expense,
  }
);

export const editValue = (value) => (
  {
    type: 'EDIT_EXPENSE',
    payload: value,
  }
);

export const searchSuccess = (currencies) => (
  { type: 'SEARCH_SUCCESS',
    payload: currencies,
  }
);

export function thunkCurrencies() {
  return async (dispatch) => {
    const response = await fetch(API);
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
  return async (dispatch) => {
    const response = await fetch(API);
    const data = await response.json();
    delete data.USDT;
    console.log(typeof valor);
    const object = {
      ...state,
      exchangeRates: data,
    };

    dispatch(thunkAction(object));
  };
}
