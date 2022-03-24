// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case 'ADD_WALLET_EXPENSES':
    return {
      ...state,
      expenses: [...state.expenses, payload],
    };
  case 'UPDATE_EXPENSES':
    return {
      ...state,
      expenses: payload,
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
