import React from "react";
import { connect } from "react-redux";
import logo from "../../assets/images/logo.png";
import "./styles.css";
import { actionNameInput, actionEmailInput } from "../../redux/actions/actionLogin";

const Login = (props) => {
  const { name, email } = props.login;

  return (
    <header>
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="trivia-game">TRIVIA GAME</h1>
      <div className="box-login">
        <input
          type="text"
          name="name"
          defaultValue={name}
          placeholder="Your name"
          onChange={(e) => props.aNameI(e.target.value)}
          data-testid="input-player-name"
        />
        <input
          type="text"
          name="email"
          placeholder="Your e-mail"
          defaultValue={email}
          onChange={(e) => props.aEmailI(e.target.value)}
          data-testid="input-gravatar-email"
        />
        <button type="button" disabled={email.length < 3 || !name} data-testid="btn-play">
          Jogar
        </button>
      </div>
    </header>
  );
};

const mapDispatchToProps = (dispatch) => ({
  aNameI: (name) => dispatch(actionNameInput(name)),
  aEmailI: (email) => dispatch(actionEmailInput(email)),
});

const mapStateToProps = (state) => ({
  login: state.loginReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
