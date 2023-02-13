import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense } from '../redux/actions/index';

class Table extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(index) {
    const { dispatch } = this.props;
    dispatch(removeExpense(index));
  }

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
                {data.exchangeRates[data.currency].name}

              </td>
              <td>
                {parseFloat(data.exchangeRates[data.currency].ask).toFixed(2)}
              </td>
              <td>
                {(data.exchangeRates[data.currency].ask * data.value).toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => this.handleClick(data.id) }
                >
                  Excluir
                </button>

              </td>
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
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
