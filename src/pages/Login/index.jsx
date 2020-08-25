import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo.png';
import './styles.css';
import {
  actionNameInput,
  actionEmailInput,
} from '../../redux/actions/actionLogin';
import { resolverToken as token } from '../../redux/actions';

class Login extends React.Component {
  
  componentDidMount() {
    this.props.getToken()
  }
  
  playToToken() {
    localStorage.setItem('token', this.props.token)
  }
  render() {
    const { pName, pEmail } = this.props;
    return (
      <header className="app-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="trivia-game">TRIVIA GAME</h1>
        <div className="box-login">
          <input
            type="text" name="name" defaultValue={pName} placeholder="Your name"
            onChange={(e) => this.props.aNameI(e.target.value)}
            data-testid="input-player-name"
          />
          <input
            type="text" name="email" placeholder="Your e-mail" defaultValue={pEmail}
            onChange={(e) => this.props.aEmailI(e.target.value)}
            data-testid="input-gravatar-email"
          />
          <Link to="/home" onClick={() => this.playToToken()}>
            <button
              type="button" disabled={pEmail.length < 3 || !pName} data-testid="btn-play"
            >
              Jogar
            </button>
          </Link>
          <Link to="/settings">
            <button data-testid="btn-settings">Settings</button>
          </Link>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  pName: state.loginReducer.name,
  pEmail: state.loginReducer.email,
  token: state.tokenReducer.data.token,
});

const mapDispatchToProps = (dispatch) => ({
  aNameI: (name) => dispatch(actionNameInput(name)),
  aEmailI: (email) => dispatch(actionEmailInput(email)),
  getToken: () => dispatch(token()),
});

Login.propTypes = {
  pName: PropTypes.string.isRequired,
  pEmail: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  aNameI: PropTypes.func.isRequired,
  aEmailI: PropTypes.func.isRequired,
  getToken: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
