/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';
import '../style/Search.css';

const stateDefault = {
  searchBand: '',
  bandArtist: '',
  isDisabled: true,
  listSearchBand: [],
  filtredAlbum: false,
};

class Search extends React.Component {
  constructor() {
    super();
    this.state = stateDefault;
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validateInputLogin());
  };

  validateInputLogin = () => {
    const { searchBand } = this.state;
    const lengthMin = 2;
    if (searchBand.length >= lengthMin) this.setState({ isDisabled: false });
  };

  handleSearchBand = async () => {
    const { searchBand } = this.state;
    const band = await searchAlbumsAPIs(searchBand);
    this.setState({
      ...stateDefault,
      listSearchBand: band,
      filtredAlbum: true,
      bandArtist: searchBand,
    });
  };

  render() {
    const { searchBand,
      isDisabled,
      listSearchBand,
      filtredAlbum,
      bandArtist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div className="container-search">
          <form className="form-search">
            <div className="box-search">
              <label htmlFor="input__search" className="label-search">
                <input
                  data-testid="search-artist-input"
                  className="input-search"
                  type="text"
                  name="searchBand"
                  value={ searchBand }
                  id="input__search"
                  autoComplete="off"
                  placeholder="Pesquise pelo nome do artista ou banda"
                  onChange={ this.handleInputChange }
                />
              </label>
              <button
                data-testid="search-artist-button"
                className="button-search"
                type="button"
                disabled={ isDisabled }
                onClick={ this.handleSearchBand }
              >
                Pesquisar
              </button>
            </div>
            <div className="container-albums">
              { filtredAlbum && (listSearchBand.length <= 0)
                ? <p className="message-not-found">Ops! Nenhum álbum foi encontrado</p>
                : (filtredAlbum && (
                  <div className="result-search">
                    <p className="message-found">
                      {`Resultado de álbuns para a banda ou artista: ${bandArtist}`}
                    </p>
                    <div className="box-albums">
                      { listSearchBand.map((album, index) => (
                        <div key={ index }>
                          <Link
                            data-testid={ `link-to-album-${album.collectionId}` }
                            className="album"
                            to={ `/album/${album.collectionId}` }
                          >
                            <img
                              src={ album.artworkUrl100 }
                              alt="record cover"
                              className="img-album"
                            />
                            <p className="collection-album">{ album.collectionName }</p>
                            <p className="artist-album">{ album.artistName }</p>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;
