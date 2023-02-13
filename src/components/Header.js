import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  editExpense = () => {
    const { value } = this.props;
    if (value.length === 0) return 0;
    const sum = value
      .reduce((acc, curr) => (parseFloat(curr.exchangeRates[curr.currency].ask)
      * parseFloat(curr.value) + acc), 0);
    return sum.toFixed(2);
  };

  render() {
    const { email } = this.props;
    const totalValue = this.editExpense() === 0 ? '0.00' : this.editExpense();
    return (
      <div>
        <p data-testid="email-field">
          Email:
          { email }
        </p>
        <p data-testid="total-field">
          { totalValue }
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  value: PropTypes.shape({
    length: PropTypes.func,
    reduce: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  value: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
