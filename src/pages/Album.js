import React from 'react';
import { string, shape } from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import '../style/Album.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      infoAlbum: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.handleGetAlbum();
  }

  handleGetAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const album = await getMusics(id);
    this.setState({ infoAlbum: album, isLoading: false });
  };

  render() {
    const { infoAlbum, isLoading } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <div className="box-music-album">
          { !isLoading && (
            <div>
              { infoAlbum.map((musicAlbum, index) => (
                index === 0
                  ? (
                    <div key={ index } className="info-music">
                      <div>
                        <img
                          src={ infoAlbum[0].artworkUrl100 }
                          alt="record cover"
                          className="front-album"
                        />
                      </div>
                      <div>
                        <h3 data-testid="artist-name">
                          {`Artista / Banda: ${infoAlbum[0].artistName}`}
                        </h3>
                        <p data-testid="album-name">
                          {`Album: ${infoAlbum[0].collectionName}`}
                        </p>
                      </div>
                    </div>
                  )
                  : (
                    <div key={ index } className="music">
                      <MusicCard musicAlbum={ musicAlbum } />
                    </div>
                  )
              )) }

            </div>
          )}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: shape({
    id: string,
  }).isRequired,
};

export default Album;
