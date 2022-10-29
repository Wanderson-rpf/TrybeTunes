import React from 'react';
import { shape, func } from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import logo from '../img/logo.png';
import '../style/Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loginUser: '',
      isDisabled: true,
      isLoading: false,
    };
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validateInputLogin());
  };

  validateInputLogin = () => {
    const { loginUser } = this.state;
    const lengthMin = 3;
    if (loginUser.length >= lengthMin) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  handleButtonClick = async () => {
    const { loginUser } = this.state;
    const { history } = this.props;

    this.setState({ isLoading: true });
    await createUser({ name: loginUser });
    this.setState({ isLoading: false });
    history.push('/search');
  };

  render() {
    const { loginUser, isDisabled, isLoading } = this.state;
    if (isLoading) return (<Loading />);

    return (
      <div data-testid="page-login" className="page-login">
        <div className="container-login">
          <div className="logo-login">
            <img src={ logo } alt="logo trybeTunes" className="logo" />
          </div>
          <form className="form-login">
            <label htmlFor="input__login" className="label-login">
              <input
                data-testid="login-name-input"
                type="text"
                name="loginUser"
                id="input__login"
                className="input-login"
                placeholder="Nome de usuário"
                value={ loginUser }
                autoComplete="off"
                onChange={ this.handleInputChange }
              />
            </label>
            <button
              data-testid="login-submit-button"
              type="button"
              disabled={ isDisabled }
              onClick={ this.handleButtonClick }
              className="button-login"
            >
              <span className="text-button">Login</span>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

export default Login;
