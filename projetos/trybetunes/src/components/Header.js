import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      username: '',
    };
  }

  componentDidMount() {
    this.getname();
  }

  getname() {
    this.setState({ loading: true });
    getUser().then(({ name }) => {
      this.setState({
        loading: false,
        username: name,
      });
    });
  }

  render() {
    const { loading, username } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? <Loading /> : (
          <>
            <h4 data-testid="header-user-name">{username}</h4>
            <Link to="/search" data-testid="link-to-search">Buscar</Link>
            <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
            <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
          </>
        )}
      </header>
    );
  }
}

export default Header;
