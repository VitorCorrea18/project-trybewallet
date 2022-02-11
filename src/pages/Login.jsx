import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogin } from '../actions/index';
import '../css/login.css';

const PASSWORD_MIN = 6;
const EMAIL_FORMAT = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isLoginBtnDisabled: true,
      redirect: false,
    };
  }

  checkLoginInputs = () => {
    const { email, password } = this.state;
    if (email.match(EMAIL_FORMAT) && password.length >= PASSWORD_MIN) {
      this.setState({ isLoginBtnDisabled: false });
    } else this.setState({ isLoginBtnDisabled: true });
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.checkLoginInputs);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state;
    const { getUserEmail } = this.props;
    getUserEmail(email);
    this.setState({ redirect: true });
  }

  render() {
    const { email, password, isLoginBtnDisabled, redirect } = this.state;
    if (redirect) return <Redirect to="/carteira" />;
    return (
      <form
        onSubmit={ this.handleSubmit }
        className="login-page__form"
      >
        <h1 className="default--title">TrybeWallet</h1>
        <input
          data-testid="email-input"
          name="email"
          className="default--input"
          type="email"
          placeholder="E-mail"
          value={ email }
          onChange={ this.onInputChange }
        />
        <input
          data-testid="password-input"
          name="password"
          className="default--input"
          type="password"
          placeholder="Senha"
          value={ password }
          onChange={ this.onInputChange }
        />
        <button
          type="submit"
          className="default--button"
          disabled={ isLoginBtnDisabled }
        >
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getUserEmail: (email) => dispatch(userLogin(email)),
});

Login.propTypes = {
  getUserEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
