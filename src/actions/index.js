import { USER_LOGIN, ADD_WALLET_EXPENSES } from './actionTypes';

export const userLogin = (email) => ({
  type: USER_LOGIN,
  payload: email,
});

export const addWalletExpenses = (expense) => ({
  type: ADD_WALLET_EXPENSES,
  payload: expense,
});
