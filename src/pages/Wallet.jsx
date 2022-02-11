import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApiThunk } from '../actions/index';

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

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  generateId = (expenses) => {
    const id = expenses.length;
    return id;
  }

  handleClick = () => {
    // expenses deve ir já com a chave exchangeRates que será um objeto vazio
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
    fetchApiProp(expense);
  }

  render() {
    const { expensesTotal, localCurrency, valueInput, descriptionInput } = this.state;
    const { userEmail, currencies } = this.props;
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
          <label
            className="default--input-label"
            htmlFor="valueInput"
          >
            Valor
            <input
              data-testid="value-input"
              className="default--input"
              id="valueInput"
              name="valueInput"
              type="number"
              value={ valueInput }
              onChange={ this.onInputChange }
            />
          </label>

          <label
            className="default--input-label"
            htmlFor="currency"
          >
            Moeda
            <select
              data-testid="currency-input"
              className="default--select"
              name="currency"
              id="currency"
              onChange={ this.onInputChange }
            >
              <option value="USD">USD</option>
              <option value="BTC">BTC</option>
              {
                // currencies do estado global da App, alimentado pela API
                currencies.map((crrCurrency) => (
                  <option
                    key={ crrCurrency }
                    value={ crrCurrency }
                    data-testid={ crrCurrency }
                  >
                    { crrCurrency }
                  </option>
                ))
              }
            </select>
          </label>

          <label
            className="default--input-label"
            htmlFor="method"
          >
            Método de Pagamento
            <select
              data-testid="method-input"
              className="default--select"
              name="method"
              id="method"
              onChange={ this.onInputChange }
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="cartão de crédito">Cartão de crédito</option>
              <option value="cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label
            className="default--input-label"
            htmlFor="tag"
          >
            Tag
            <select
              data-testid="tag-input"
              className="default--select"
              name="tag"
              id="tag"
              onChange={ this.onInputChange }
            >
              <option value="alimentação">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saúde">Saúde</option>
            </select>
          </label>

          <label
            className="default--input-label"
            htmlFor="description"
          >
            Descrição
            <input
              data-testid="description-input"
              className="default--input"
              id="description"
              name="descriptionInput"
              type="text"
              value={ descriptionInput }
              onChange={ this.onInputChange }
            />
          </label>

          <button
            type="button"
            className="default--button"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        </aside>
      </div>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  userEmail: user.email,
  currencies: wallet.currencies,
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApiProp: (expense) => dispatch(fetchApiThunk(expense)),
});

Wallet.propTypes = {
  userEmail: propTypes.string.isRequired,
  currencies: propTypes.instanceOf(Array).isRequired,
  expenses: propTypes.instanceOf(Array).isRequired,
  fetchApiProp: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
