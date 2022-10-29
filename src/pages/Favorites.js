import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import '../style/Favorites.css';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      listFavorites: [],
    };
  }

  componentDidMount() {
    this.getFavoriteMusic();
  }

  getFavoriteMusic = async () => {
    this.setState({ isLoading: true });
    const getList = await getFavoriteSongs();
    this.setState({ listFavorites: getList, isLoading: false });
  };

  render() {
    const { isLoading, listFavorites } = this.state;
    if (isLoading) return (<Loading />);

    return (
      <div data-testid="page-favorites" className="container-favorites">
        <Header />
        <div className="box-favorites">
          <h2 className="title-favorites">Lista de músicas favoritas</h2>
          <div>
            { listFavorites.map((music, index) => (
              <span key={ index }>
                <MusicCard
                  musicAlbum={ music }
                  refresh={ this.getFavoriteMusic }
                />
              </span>
            )) }
          </div>
        </div>
      </div>
    );
  }
}

export default Favorites;
