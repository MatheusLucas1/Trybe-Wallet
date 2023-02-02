import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

  email: state.email,
  password: state.password,
  error: state.error,
});

export default connect(mapStateToProps)(Wallet);
