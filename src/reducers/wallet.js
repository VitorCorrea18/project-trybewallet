// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
};

const walletReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case 'ADD_WALLET_EXPENSES':
    return {
      ...state,
      wallet: {
        currencies: payload.currencies,
        expenses: payload.expenses,
      },
    };
  default:
    return state;
  }
};

export default walletReducer;
