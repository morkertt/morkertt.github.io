import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = { loading: false, checked: false };
  }

  async handleClick({ target }) {
    const { musicList } = this.props;
    const { checked } = this.state;
    this.setState({ loading: true, checked: true });
    if (checked) { this.setState({ checked: false }); }
    // removi sem querer a função de click do check box REVER!!
    const song = musicList
      .filter((music) => String(music.trackId) === target.name);
    await addSong(...song);
    this.setState({ loading: false });
  }

  render() {
    const { loading, checked } = this.state;
    const { trackName, previewUrl, trackId } = this.props;

    return (
      <div key={ trackId }>
        {loading ? <Loading /> : (
          <>
            <h6>{trackName}</h6>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
            <label htmlFor="favorite">
              Favorita
              <input
                type="checkbox"
                id="favorite"
                name={ trackId }
                data-testid={ `checkbox-music-${trackId}` }
                checked={ checked }
                onClick={ this.handleClick }
              />
            </label>
          </>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.string,
}.isRequired;

export default MusicCard;
