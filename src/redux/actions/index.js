// Coloque aqui suas actions
// ACTIONS TYPES
export const ADD_EMAIL = 'ADD_EMAIL';

export const addEmail = (email) => (
  {
    type: 'ADD_EMAIL',
    payload: email,
  }
);

export const searchBegin = () => (
  { type: 'SEARCH_BEGIN' }
);

export const searchSuccess = (currencies) => (
  { type: 'SEARCH_SUCCESS',
    payload: currencies }
);

export function thunkCurrencies() {
  return async (dispatch) => {
    dispatch(searchBegin());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const result = Object.keys(data).filter((_curr) => _curr !== 'USDT');
    dispatch(searchSuccess(result));
  };
}
