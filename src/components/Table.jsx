import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { updateExpenses } from '../actions/index';

const CURRENCY_EXCHANGE = 'Real';

class Table extends React.Component {
  onEraseBtnClick = (id) => {
    const { updateExpensesProp, expenses, updateTotal } = this.props;
    const upDatedExpenses = expenses.filter((expense) => expense.id !== id);
    const expenseToErase = expenses.find((expense) => expense.id === id);
    updateExpensesProp(upDatedExpenses); // mapDispatchToProps
    updateTotal(expenseToErase);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table className="wallet__page--table">
        <thead className="table--header">
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody className="table--body">
          {
            expenses.map((expense) => {
              const {
                description, currency, value, method, tag, exchangeRates, id } = expense;
              const { ask, name } = exchangeRates[currency];
              const splitName = name.split('/');
              const exchangedValue = value * ask;

              return (
                <tr key={ id }>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ (Math.round(value * 100) / 100).toFixed(2) }</td>
                  <td>{ splitName[0] }</td>
                  <td>{ (Math.round(ask * 100) / 100).toFixed(2) }</td>
                  <td>{ (Math.round(exchangedValue * 100) / 100).toFixed(2) }</td>
                  <td>{ CURRENCY_EXCHANGE }</td>
                  <td>
                    <button
                      data-testid="delete-btn"
                      type="button"
                      className="default--erase-btn"
                      onClick={ () => this.onEraseBtnClick(id) }
                    >
                      X
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  updateExpensesProp: (updatedExpenses) => dispatch(updateExpenses(updatedExpenses)),
});

Table.propTypes = {
  expenses: propTypes.instanceOf(Array).isRequired,
  updateExpensesProp: propTypes.func.isRequired,
  updateTotal: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
