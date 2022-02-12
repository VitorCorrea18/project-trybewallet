import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Form extends React.Component {
  render() {
    const {
      handleClick, valueInput, descriptionInput, onInputChange, currencies } = this.props;

    return (
      <form className="--menu-aside-form" onSubmit={ handleClick }>
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
            onChange={ onInputChange }
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
            onChange={ onInputChange }
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
            onChange={ onInputChange }
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
            onChange={ onInputChange }
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
            onChange={ onInputChange }
          />
        </label>

        <button
          type="submit"
          className="default--button"
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

Form.propTypes = {
  handleClick: propTypes.func.isRequired,
  onInputChange: propTypes.func.isRequired,
  valueInput: propTypes.string.isRequired,
  descriptionInput: propTypes.string.isRequired,
  currencies: propTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps)(Form);
