import React, { Component } from 'react';
import Header from '../Header';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  clearPlayer() {
    localStorage.removeItem('state');
  }
  render() {
    const rankingPlayer = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div>
        <Header />
        {rankingPlayer.map((player, index) =>
          <div>
            <span data-testid={`player-name-${index}`} >Name: <span>{player.name}</span></span>
            <span>Score: <span>{player.score}</span></span>
            <img src={player.picture} alt="Player" />
          </div>
        )}
        <Link to="/" onClick={this.clearPlayer}>
          <button data-testid="btn-go-home">Voltar ao Login</button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
