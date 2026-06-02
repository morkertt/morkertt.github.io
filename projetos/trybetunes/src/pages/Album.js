import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.getSavedFav = this.getSavedFav.bind(this);
    this.state = {
      album: '',
      artist: '',
      albumImage: '',
      musicList: [],
      favorites: [],
      loading: false,
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;

    getMusics(id).then((musics) => {
      const Musics = musics;
      const songs = Musics.filter((type) => type.kind === 'song');
      this.setState({
        album: Musics[0].collectionName,
        artist: Musics[0].artistName,
        albumImage: Musics[0].artworkUrl100,
        musicList: songs,
      });
      this.getSavedFav();
    });
  }

  getSavedFav() {
    const { favorites } = this.state;
    this.setState({ loading: true });
    getFavoriteSongs().then((savedFav) => {
      this.setState({
        favorites: [...savedFav], loading: false });
    });
    console.log(favorites);
  }

  render() {
    const { album, albumImage, artist, musicList, loading } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        {loading ? (<Loading />) : (
          <>
            <section>
              <img src={ albumImage } alt={ album } />
              <h4 data-testid="artist-name">{artist}</h4>
              <h5 data-testid="album-name">{album}</h5>
            </section>
            <section>
              {musicList.map(({ trackName, previewUrl, trackId }) => (
                <MusicCard
                  key={ trackId }
                  trackName={ trackName }
                  previewUrl={ previewUrl }
                  musicList={ musicList }
                  trackId={ trackId }
                />
              ))}
            </section>
          </>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default Album;
