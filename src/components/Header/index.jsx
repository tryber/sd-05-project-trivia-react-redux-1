import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './styles.css';

class Header extends Component {
  render() {
    const { name, gravatar, score } = this.props;
    return (
      <div className="player-header-info">
        <div>
          <header className="player-info">
            <h3 data-testid="header-player-name">Nome: {name}</h3>
            <h3 data-testid="header-score">Score: {score} </h3>
            <img data-testid="header-profile-picture" alt="gravatar" src={gravatar} />
          </header>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.loginReducer.name,
  gravatar: state.loginReducer.gravatar,
  score: state.scoreReducer.score
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatar: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
