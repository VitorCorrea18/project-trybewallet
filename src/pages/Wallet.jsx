import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApiThunk, addCurrencies } from '../actions/index';
import Form from '../components/Form';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      expensesTotal: 0,
      localCurrency: 'BRL',
      valueInput: '',
      descriptionInput: '',
      currency: 'USD',
      method: 'dinheiro',
      tag: 'alimentação',
    };
  }

  // componentDidMount() {
  //   this.fetchCurrencies();
  // }

  // fetchCurrencies = async () => {
  //   const { addCurrenciesProp } = this.props;
  //   const data = await fetch()
  // }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  generateId = (expenses) => {
    const id = expenses.length;
    return id;
  }

  calculateTotal = (expense) => {
    const { exchangeRates, currency, value } = expense;
    const { expensesTotal } = this.state;
    const { ask } = exchangeRates[currency];
    const newExpense = value * ask;
    this.setState({ expensesTotal: expensesTotal + newExpense });
  }

  handleClick = async (e) => {
    // expense deve ir já com a chave exchangeRates que será um objeto vazio preenchido após a chamada da API.
    e.preventDefault();
    const { fetchApiProp, expenses } = this.props;
    const { valueInput, descriptionInput, currency, method, tag } = this.state;
    const id = this.generateId(expenses);
    const expense = {
      id,
      value: valueInput,
      description: descriptionInput,
      currency,
      method,
      tag,
      exchangeRates: {},
    };
    await fetchApiProp(expense); // mapDispatchToProps
    this.calculateTotal(expense);
  }

  render() {
    const { expensesTotal, localCurrency, valueInput, descriptionInput } = this.state;
    const { userEmail } = this.props;
    return (
      <div className="wallet__page">
        <header className="wallet__page--header">
          <div className="__header--div">
            <span
              data-testid="email-field"
              className="--div-span-email"
            >
              {`User: ${userEmail}` }
            </span>
          </div>
          <div className="__header--div">
            <p>Despesa total: </p>
            <span
              data-testid="total-field"
              className="--div-span-total"
            >
              { `R$ ${expensesTotal}` }
            </span>
            <span
              data-testid="header-currency-field"
              className="--div-span-currency"
            >
              { localCurrency }
            </span>
          </div>
        </header>
        <aside className="Wallet__page--menu-aside">
          <Form
            handleClick={ this.handleClick }
            onInputChange={ this.onInputChange }
            valueInput={ valueInput }
            descriptionInput={ descriptionInput }
          />
        </aside>
      </div>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  userEmail: user.email,
  currencies: wallet.currencies,
  expenses: wallet.expenses,
  expensesTotal: wallet.expensesTotal,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApiProp: (expense) => dispatch(fetchApiThunk(expense)),
  addCurrenciesProp: (currencies) => dispatch(addCurrencies(currencies)),
});

Wallet.propTypes = {
  userEmail: propTypes.string.isRequired,
  expenses: propTypes.instanceOf(Array).isRequired,
  fetchApiProp: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
