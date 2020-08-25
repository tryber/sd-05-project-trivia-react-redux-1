import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo.png';
import './styles.css';
import { actionNameInput, actionEmailInput, actionIsLogged } from '../../redux/actions/actionLogin';

const Login = (props) => {
  const { pName, pEmail } = props;
  return (
    <header className="app-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="trivia-game">TRIVIA GAME</h1>
      <div className="box-login">
        <input
          type="text" name="name" defaultValue={pName} placeholder="Your name"
          onChange={(e) => props.aNameI(e.target.value)} data-testid="input-player-name"
        />
        <input
          type="text" name="email" placeholder="Your e-mail" defaultValue={pEmail}
          onChange={(e) => props.aEmailI(e.target.value)} data-testid="input-gravatar-email"
        />
        <Link to="/home" onClick={() => props.isLogged(true)}>
          <button
            type="button"
            disabled={pEmail.length < 3 || !pName}
            data-testid="btn-play"
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
};

const mapDispatchToProps = (dispatch) => ({
  aNameI: (name) => dispatch(actionNameInput(name)),
  aEmailI: (email) => dispatch(actionEmailInput(email)),
  isLogged: (login) => dispatch(actionIsLogged(login)),
});

const mapStateToProps = (state) => ({
  pName: state.loginReducer.name,
  pEmail: state.loginReducer.email,
});

Login.propTypes = {
  isLogged: PropTypes.func.isRequired,
  aNameI: PropTypes.func.isRequired,
  aEmailI: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
