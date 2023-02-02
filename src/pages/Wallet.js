import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    return <div>TrybeWallet</div>;
  }
}

const mapStateToProps = (state) => ({

  email: state.email,
  password: state.password,
  error: state.error,
});

export default connect(mapStateToProps)(Wallet);
