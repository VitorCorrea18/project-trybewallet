import fetchApi from '../services/fetchApi';
import { USER_LOGIN, ADD_WALLET_EXPENSES } from './actionTypes';

export const userLogin = (email) => ({
  type: USER_LOGIN,
  payload: email,
});

export const addWalletExpenses = (expense) => ({
  type: ADD_WALLET_EXPENSES,
  payload: expense,
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
