import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

const CURRENCY_EXCHANGE = 'Real';

class Table extends React.Component {
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
        <tbody>
          {
            expenses.map((expense) => {
              const {
                description, currency, value, method, tag, exchangeRates, id } = expense;
              const { ask, name } = exchangeRates[currency];
              const splitName = name.split('/');
              const exchangedValue = value * ask;

              return (
                <tr key={ id }>
                  <th>{ description }</th>
                  <th>{ tag }</th>
                  <th>{ method }</th>
                  <th>{ value }</th>
                  <th>{ splitName[0] }</th>
                  <th>{ ask }</th>
                  <th>{ exchangedValue }</th>
                  <th>{ CURRENCY_EXCHANGE }</th>
                  <th>botões</th>
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

Table.propTypes = {
  expenses: propTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps)(Table);
