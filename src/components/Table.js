import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { wallet } = this.props;
    const { expenses } = wallet;

    return (
      <table>
        <thead>
          <tr>
            <th scope="col">Descrição</th>
            <th scope="col">Tag</th>
            <th scope="col">Método de pagamento</th>
            <th scope="col">Valor</th>
            <th scope="col">Moeda</th>
            <th scope="col">Câmbio utilizado</th>
            <th scope="col">Valor convertido</th>
            <th scope="col">Moeda de conversão</th>
            <th scope="col">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((data) => (
            <tr key={ data.id }>
              <td>{ data.description }</td>
              <td>{ data.tag }</td>
              <td>{ data.method }</td>
              <td>{ parseFloat(data.value).toFixed(2) }</td>
              <td>
                {(Object.values(data.exchangeRates)
                  .filter((curr) => curr.code === data.currency)[0].name)}

              </td>
              <td>
                {parseFloat((Object.values(data.exchangeRates)
                  .filter((curr) => curr.code === data.currency)[0].ask)).toFixed(2)}
              </td>
              <td>
                { (data.value * (Object.values(data.exchangeRates)
                  .filter((curr) => curr.code === data.currency)[0].ask)).toFixed(2) }

              </td>
              <td>Real</td>
            </tr>
          ))}
        </tbody>

      </table>
    );
  }
}
const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

Table.propTypes = {
  wallet: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.string),
    expenses: PropTypes.arrayOf(PropTypes.shape({})),
    totalValue: PropTypes.number,
  }).isRequired,

};

export default connect(mapStateToProps)(Table);
