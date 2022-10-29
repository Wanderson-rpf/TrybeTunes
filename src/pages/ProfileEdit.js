import React from 'react';
import { shape, func } from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../style/ProfileEdit.css';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      userEmail: '',
      userDescription: '',
      userImage: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getInfoUser();
  }

  getInfoUser = async () => {
    const user = await getUser();
    const { name, email, description, image } = user;
    this.setState({
      userName: name,
      userEmail: email,
      userDescription: description,
      userImage: image,
    });
  };

  validadeInputs = () => {
    const { userName, userEmail, userDescription, userImage } = this.state;
    const isDisabledButon = (
      userName.length > 0
        && userEmail.length > 0
        && userDescription.length > 0
        && userImage.length > 0
    );
    return !isDisabledButon;
  };

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  savedUser = () => {
    const { userName, userEmail, userDescription, userImage } = this.state;
    const { history } = this.props;
    const user = {
      name: userName,
      email: userEmail,
      description: userDescription,
      image: userImage,
    };
    this.setState({ isLoading: true }, async () => {
      await updateUser(user);
      history.push('/profile');
    });
  };

  render() {
    const {
      userName,
      userEmail,
      userDescription,
      userImage,
      isLoading,
    } = this.state;

    if (isLoading) return (<Loading />);
    return (
      <div data-testid="page-profile-edit" className="container-edit-profile">
        <Header />
        <div className="box-etid-profile">
          <form className="form-edit-profile">
            <label htmlFor="input__name" className="label-form-edit">
              Name
              <input
                data-testid="edit-input-name"
                className="input-edit-form"
                type="text"
                name="userName"
                id="input__name"
                value={ userName }
                autoComplete="off"
                onChange={ this.handleInputChange }
              />
            </label>
            <label htmlFor="input__email">
              E-mail
              <input
                data-testid="edit-input-email"
                className="input-edit-form"
                type="email"
                name="userEmail"
                id="input__email"
                value={ userEmail }
                autoComplete="off"
                onChange={ this.handleInputChange }
              />
            </label>
            <label htmlFor="input__description">
              Description
              <textarea
                data-testid="edit-input-description"
                className="input-edit-form input-text-area-edit"
                type="email"
                name="userDescription"
                id="input__description"
                value={ userDescription }
                onChange={ this.handleInputChange }
              />
            </label>
            <label htmlFor="input__image">
              Photo Profile
              <input
                data-testid="edit-input-image"
                className="input-edit-form"
                type="text"
                name="userImage"
                id="input__image"
                value={ userImage }
                autoComplete="off"
                onChange={ this.handleInputChange }
              />
            </label>
            <button
              data-testid="edit-button-save"
              className="button-edit-profile"
              type="button"
              disabled={ this.validadeInputs() }
              onClick={ this.savedUser }
            >
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: shape({
    push: func,
  }).isRequired,
};

export default ProfileEdit;
