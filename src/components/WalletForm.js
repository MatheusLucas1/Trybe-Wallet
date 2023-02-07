import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { thunkCurrencies, thunkExpenses } from '../redux/actions/index';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
      currency: 'USD',
    };
    this.handleChange = this.handleChange.bind(this);
    this.addExpense = this.addExpense.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(thunkCurrencies());
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  addExpense() {
    const { dispatch } = this.props;
    const {
      id,
      value,
      description,
      method,
      tag,
      currency,
    } = this.state;
    const newExpense = {
      id,
      value,
      description,
      method,
      tag,
      currency,
    };
    dispatch(thunkExpenses(newExpense));
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
      currency: 'USD',
    }));
  }

  render() {
    const { currencies } = this.props;
    const { value, description, tag, method, currency } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="valuevalue">
            {' '}
            Valor:
          </label>
          <input
            type="text"
            onChange={ this.handleChange }
            value={ value }
            name="value"
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
            onChange={ this.handleChange }
            value={ description }
            name="description"
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
            value={ currency }
            name="currency"
            onChange={ this.handleChange }
          >
            {currencies.map((_curr, index) => (
              <option
                key={ index }
                value={ _curr }
              >
                { _curr }

              </option>
            ))}
          </select>
          <label htmlFor="method">
            {' '}
            Método de pagamento:
          </label>
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <label htmlFor="tag">
            {' '}
            Categoria:
          </label>
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </form>
        <button
          type="button"
          onClick={ this.addExpense }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
