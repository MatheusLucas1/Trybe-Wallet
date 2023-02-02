import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEmail } from '../redux/actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      email: '',
      password: '',
    };
    // this.handleEmail = this.handleEmail.bind(this);
    // this.handlePassword = this.handlePassword.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // handleEmail({ target }) {
  //   this.setState({
  //     email: target.value,
  //   });
  //   const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  //   return target.value.match(validRegex);
  // }

  // handlePassword({ target }) {
  //   this.setState({
  //     password: target.value,
  //   });
  //   const n = 6;
  //   const { value } = target;
  //   const { length } = value;
  //   return length >= n;
  // }

  handleChange({ target }) {
    const { email, password } = this.state;
    if (target.type === 'text') {
      this.setState({
        email: target.value,
      });
    }
    if (target.type === 'password') {
      this.setState({
        password: target.value,
      });
    }

    const validRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    const matchValue = email.match(validRegex);

    const n = 5;
    const validPassword = password.length >= n;
    if (matchValue && validPassword) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  handleClick = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(addEmail(email));
    history.push('/carteira');
  };

  render() {
    const { isDisabled, email, password } = this.state;
    return (
      <div>
        <form>
          <input
            type="text"
            placeholder="Type your email"
            data-testid="email-input"
            value={ email }
            onChange={ this.handleChange }
          />
          <input
            type="password"
            data-testid="password-input"
            placeholder="Password"
            value={ password }
            onChange={ this.handleChange }
          />
        </form>
        <button
          disabled={ isDisabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
