import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.handler = this.handler.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      artist: '',
      isDisabled: true,
      loading: false,
      recieve: [],
      showAlbum: true,
      showArtist: '',
    };
  }

  handler(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    }, () => { this.enableButton(); });
  }

  handleClick = () => {
    const { artist } = this.state;
    this.setState({ loading: true, showArtist: artist });

    searchAlbumsAPI(artist).then((element) => {
      this.setState({
        recieve: element,
        showAlbum: element.length > 0,
        artist: '',
      });
    });
    this.setState({ loading: false });
  }

  enableButton() {
    const { artist } = this.state;
    if (artist.length > 1) {
      this.setState({ isDisabled: false });
    }
  }

  render() {
    const { artist, isDisabled, loading, recieve, showAlbum, showArtist } = this.state;

    if (loading) { <Loading />; }

    return (
      <>
        <div data-testid="page-search">
          <Header />
          <form>
            <input
              type="text"
              data-testid="search-artist-input"
              name="artist"
              onChange={ this.handler }
              value={ artist }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ isDisabled }
              onClick={ this.handleClick }
            >
              Procurar
            </button>
          </form>
        </div>
        {recieve.length !== 0
          ? `Resultado de álbuns de: ${showArtist}` : ''}
        {showAlbum ? (
          recieve.map((recievedAlbum) => (
            <Link
              to={ `/album/${recievedAlbum.collectionId}` }
              key={ recievedAlbum.collectionId }
              data-testid={ `link-to-album-${recievedAlbum.collectionId}` }
            >
              {recievedAlbum.collectionName}
            </Link>
          ))) : <p>Nenhum álbum foi encontrado</p>}

      </>
    );
  }
}

export default Search;
