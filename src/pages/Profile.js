import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserEdit } from 'react-icons/fa';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import userLogo from '../img/user.png';
import '../style/Profile.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      infoUser: '',
    };
  }

  componentDidMount() {
    this.getInfoUser();
  }

  getInfoUser = async () => {
    const user = await getUser();
    this.setState({ infoUser: user });
  };

  render() {
    const { infoUser } = this.state;

    return (
      <div data-testid="page-profile" className="container-profile">
        <Header />
        <div className="box-profile">
          <div className="img-profile">
            <span>
              <img
                data-testid="profile-image"
                src={ userLogo }
                alt="profile"
                className="image-profile"
              />
            </span>
          </div>
          <div className="info-profile">
            <span>
              <h3>Name</h3>
              <p>{infoUser.name}</p>
            </span>
            <span>
              <h3>E-mail</h3>
              <p>{infoUser.email}</p>
            </span>
            <span>
              <h3>Description</h3>
              <p>{infoUser.description}</p>
            </span>
          </div>
        </div>
        <div>
          <Link to="/profile/edit" className="edit-profile">
            <span><FaUserEdit /></span>
            <p>Editar perfil</p>
          </Link>
        </div>
      </div>
    );
  }
}

export default Profile;
