import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.handler = this.handler.bind(this);
    this.handlerClick = this.handlerClick.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.state = {
      isButtonDisabled: true,
      loading: false,
      redirect: false,
      nameInput: '',
    };
  }

  handler(event) {
    const { name } = event.target;
    const value = event.target.type === 'checkbox'
      ? event.target.checked : event.target.value;
    this.setState({
      [name]: value,
      isButtonDisabled: true,
    }, () => {
      this.enableButton();
    });
  }

  handlerClick() {
    const { nameInput } = this.state;
    this.setState({ loading: true });
    createUser({ name: nameInput }).then(() => {
      this.setState({ loading: false, redirect: true });
    });
  }

  enableButton() {
    const { nameInput } = this.state;
    if (nameInput.length > 2) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  }

  render() {
    const { nameInput, isButtonDisabled, loading, redirect } = this.state;
    const hint = 'Como testar: digite um nome (3+ letras) e clique em Entrar. '
      + 'Depois busque um artista (ex.: Coldplay), abra um álbum e favorite músicas.';

    return (
      <div data-testid="page-login">
        {loading ? <Loading />
          : (
            <>
              <h2>Login</h2>
              <p className="demo-hint">{hint}</p>
              <form>
                Nome:
                <input
                  data-testid="login-name-input"
                  type="text"
                  name="nameInput"
                  value={ nameInput }
                  onChange={ this.handler }
                />
                <input
                  type="submit"
                  data-testid="login-submit-button"
                  disabled={ isButtonDisabled }
                  onClick={ this.handlerClick }
                  value="Entrar"
                />
              </form>
            </>
          )}
        {redirect ? <Redirect to="/search" /> : ''}
      </div>
    );
  }
}

export default Login;
