import fetchApi from '../services/fetchApi';
import { USER_LOGIN, ADD_WALLET_EXPENSES, FETCH_CURRENCIES } from './actionTypes';

export const userLogin = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export const addWalletExpenses = (payload) => ({
  type: ADD_WALLET_EXPENSES,
  payload,
});

export const addCurrencies = (payload) => ({
  type: FETCH_CURRENCIES,
  payload,
});

export const fetchApiThunk = (expense) => async (dispatch) => {
  try {
    const data = await fetchApi();
    expense.exchangeRates = data;
    dispatch(addWalletExpenses(expense));
  } catch (error) {
    console.error(error.message);
  }
};
