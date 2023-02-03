import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { thunkCurrencies } from '../redux/actions/index';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(thunkCurrencies());
  }

  render() {
    const { currencies } = this.props;

    return (
      <div>
        <form>
          <label htmlFor="value">
            {' '}
            Valor:
          </label>
          <input
            type="text"
            id="value"
            data-testid="value-input"
            placeholder="Input Value"
          />

          <label htmlFor="description">
            {' '}
            Descrição:
          </label>
          <input
            type="text"
            id="description"
            data-testid="description-input"
            placeholder="Input description"
          />
          <label htmlFor="currency">
            {' '}
            Moeda:
          </label>
          <select
            data-testid="currency-input"
            id="currency"
          >
            {currencies.map((currency, index) => (
              <option key={ index }>{ currency }</option>
            ))}
          </select>
          <label htmlFor="method">
            {' '}
            Método de pagamento:
          </label>
          <select data-testid="method-input" id="method">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <label htmlFor="tag">
            {' '}
            Categoria:
          </label>
          <select data-testid="tag-input" id="tag">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf({
    currency: PropTypes.shape({
      code: PropTypes.string,
    }),
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
