import { USER_LOGIN, ADD_WALLET_EXPENSES } from './actionTypes';

const userLogin = (email) => ({
  type: USER_LOGIN,
  payload: email,
});

const addWalletExpenses = (expense) => ({
  type: ADD_WALLET_EXPENSES,
  payload: expense,
});

export default { userLogin, addWalletExpenses };
