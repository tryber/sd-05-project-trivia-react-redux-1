import React, { Component } from 'react';
import Header from '../Header';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Feedback extends Component {
  
  componentDidMount() {
    const { gravatar } = this.props;
    const playerInfo = JSON.parse(localStorage.getItem('state'));
    const oldRanking = JSON.parse(localStorage.getItem('ranking'));
    const rankingPlayer = [{
      name: playerInfo.player.name,
      score: playerInfo.player.score,
      picture: gravatar,
    }];
    if(oldRanking) {
      oldRanking.push(...rankingPlayer);
      oldRanking.sort((x, y) => y.score - x.score);
      localStorage.setItem('ranking', JSON.stringify(oldRanking));
    } else {
      localStorage.setItem('ranking', JSON.stringify(rankingPlayer));
    }
  }
  clearPlayer() {
    localStorage.removeItem('state');
  }

  render() {
    const playerInfo = JSON.parse(localStorage.getItem('state'));
    
    return (
      <div>
        <Header />
        {playerInfo.player.assertions < 3 && <p data-testid="feedback-text">Podia ser melhor...</p>}
        {playerInfo.player.assertions >= 3 && <p data-testid="feedback-text">Mandou bem!</p>}
        <p>Score: <span data-testid="feedback-total-score">{playerInfo.player.score}</span></p>
        <p>
          Assertions:
          <span data-testid="feedback-total-question">
            {playerInfo.player.assertions}
          </span>
        </p>
        <Link to ="/">
          <button data-testid="btn-play-again" onClick={this.clearPlayer}>Jogar Novamente</button>
        </Link>
        <Link to ="/ranking">
          <button data-testid="btn-ranking">Ver Ranking</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatar: state.loginReducer.gravatar,
})

export default connect(mapStateToProps)(Feedback);
