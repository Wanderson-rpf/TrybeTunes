/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import { CiUser } from 'react-icons/ci';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import logo from '../img/logo.png';
import userLogo from '../img/user.png';
import '../style/Header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      nameUser: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getUserLogged();
  }

  getUserLogged = async () => {
    this.setState({ isLoading: true });
    const user = await getUser();
    this.setState({ isLoading: false });
    this.setState({ nameUser: user.name });
  };

  render() {
    const { nameUser, isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <header data-testid="header-component" className="header">
        <div className="container-title">
          <img src={ logo } alt="logo-trybeTunes" className="logo-menu" />
        </div>
        <div className="container-user">
          <img src={ userLogo } alt="icon-user" className="icon-user" />
          <p data-testid="header-user-name" className="user-name">{ nameUser }</p>
        </div>
        <nav className="container-menu">
          <ul className="list-menu">
            <li>
              <Link
                data-testid="link-to-search"
                to="/search"
                className="item-menu"
              >
                <div className="box-icon-menu">
                  <BsSearch className="icon-menu" />
                  <p className="text-menu">Pesquisar</p>
                </div>
              </Link>
            </li>
            <li>
              <Link
                data-testid="link-to-favorites"
                to="/favorites"
                className="item-menu"
              >
                <div className="box-icon-menu">
                  <AiOutlineHeart className="icon-menu" />
                  <p>Favoritos</p>
                </div>
              </Link>
            </li>
            <li>
              <Link
                data-testid="link-to-profile"
                to="/profile"
                className="item-menu"
              >
                <div className="box-icon-menu">
                  <CiUser className="icon-menu" />
                  <p>Perfil</p>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
