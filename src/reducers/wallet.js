// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  expensesTotal: 0,
};

const walletReducer = (state = INITIAL_STATE, { type, payload }) => {
  // const { currency, exchangeRates } = payload;
  // const value = exchangeRates[currency].ask;
  switch (type) {
  case 'ADD_WALLET_EXPENSES':
    return {
      ...state,
      expenses: [...state.expenses, payload],
      // expensesTotal: state.expensesTotal + value,
    };
  case 'FETCH_CURRENCIES':
    return {
      ...state,
      currencies: payload,
    };
  default:
    return state;
  }
};

export default walletReducer;
