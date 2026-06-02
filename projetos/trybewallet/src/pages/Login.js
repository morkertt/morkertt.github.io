import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loginEmail: '',
      loginPassword: '',
      isLoginDisabled: true,
    };
    this.handleInput = this.handleInput.bind(this);
    this.buttonDisabled = this.buttonDisabled.bind(this);
  }

  handleInput({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.buttonDisabled());
  }

  buttonDisabled() {
    const { loginEmail, loginPassword } = this.state;
    const MIN_LENGHT = 6;
    // https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
    const checkEmail = loginEmail.includes('@' && '.com');

    if (loginPassword.length >= MIN_LENGHT && checkEmail) {
      this.setState({ isLoginDisabled: false });
    } else {
      this.setState({ isLoginDisabled: true });
    }
  }

  render() {
    const { loginEmail, loginPassword, isLoginDisabled } = this.state;
    const { handleClick, history } = this.props;

    return (
      <div>
        <p>Login</p>
        <form>
          <label htmlFor="email-input">
            Email:
            <input
              type="email"
              data-testid="email-input"
              name="loginEmail"
              value={ loginEmail }
              onChange={ this.handleInput }
            />
          </label>
          <label htmlFor="password-input">
            Senha:
            <input
              type="password"
              data-testid="password-input"
              name="loginPassword"
              value={ loginPassword }
              onChange={ this.handleInput }
            />
          </label>
          <button
            type="button"
            name="isLoginDisabled"
            disabled={ isLoginDisabled }
            onClick={ () => {
              handleClick(loginEmail);
              history.push('/carteira');
            } }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  handleClick: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  handleClick: (email) => {
    dispatch(saveEmail(email));
  },
});

export default connect(null, mapDispatchToProps)(Login);
