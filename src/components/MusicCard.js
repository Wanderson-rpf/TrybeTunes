import React from 'react';
import { shape, string, func } from 'prop-types';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import '../style/MusicCard.css';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      isCheckedFavorite: false,
      listFavorites: [],
    };
  }

  componentDidMount() {
    this.getFavoriteMusic();
  }

  getFavoriteMusic = async () => {
    const getList = await getFavoriteSongs();
    this.setState({ listFavorites: getList }, this.verifyFavorites);
  };

  verifyFavorites = () => {
    const { musicAlbum } = this.props;
    const { listFavorites } = this.state;
    const verifyFav = listFavorites
      .some(({ trackId }) => Number(trackId) === Number(musicAlbum.trackId));
    if (verifyFav) this.setState({ isCheckedFavorite: true });
  };

  musicFavorite = ({ target }) => {
    const { checked } = target;
    if (checked) {
      this.setState({ isCheckedFavorite: checked }, this.savedMusicFavorite);
    } else {
      this.setState({ isCheckedFavorite: false }, this.deleteMusicFavorite);
    }
  };

  savedMusicFavorite = async () => {
    const { musicAlbum, refresh } = this.props;
    this.setState({ isLoading: true });
    await addSong(musicAlbum);
    this.setState({ isLoading: false });
    refresh();
  };

  deleteMusicFavorite = async () => {
    const { musicAlbum, refresh } = this.props;
    this.setState({ isLoading: true });
    await removeSong(musicAlbum);
    this.setState({ isLoading: false });
    refresh();
  };

  render() {
    const { musicAlbum } = this.props;
    const { isCheckedFavorite, isLoading } = this.state;

    if (isLoading) return (<Loading />);
    return (
      <div>
        <div className="box-music">
          <p className="music-name">{ musicAlbum.trackName }</p>
          <audio data-testid="audio-component" src={ musicAlbum.previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
          <label
            htmlFor={ `input__favorite${musicAlbum.trackId}` }
            className="label-favorite"
          >
            <input
              data-testid={ `checkbox-music-${musicAlbum.trackId}` }
              className="input-favorite"
              type="checkbox"
              name="isCheckedFavorite"
              checked={ isCheckedFavorite }
              onChange={ this.musicFavorite }
              id={ `input__favorite${musicAlbum.trackId}` }
            />
            <span>
              { isCheckedFavorite
                ? <AiFillHeart className="favorite" />
                : <AiOutlineHeart className="favorite" /> }
            </span>
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.defaultProps = {
  refresh: () => console.log(),
};

MusicCard.propTypes = {
  refresh: func,
  musicAlbum: shape({
    trackName: string,
    previewUrl: string,
  }).isRequired,
};

export default MusicCard;
