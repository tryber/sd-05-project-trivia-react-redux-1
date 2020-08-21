import React, { Component } from "react";
import { connect } from "react-redux";
import './styles.css';

class Header extends Component {
  render() {
    const { name, gravatar } = this.props.login;
    return (
      <div className="player-header-info">
        <div>
          <header className="player-info">
            <h3 data-testid="header-player-name">Nome: {name}</h3>
            <h3 data-testid="header-score">Score:0 </h3>
            <img data-testid="header-profile-picture" alt='gravatar' src={gravatar}></img>
          </header>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.loginReducer,
});

export default connect(mapStateToProps)(Header);
