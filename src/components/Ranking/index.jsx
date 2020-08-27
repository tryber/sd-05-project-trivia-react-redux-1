import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function clearPlayer() {
  localStorage.removeItem('state');
}
class Ranking extends Component {
  render() {
    const rankingPlayer = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {rankingPlayer.map((player, index) =>
          <div>
            <p>Name: <span data-testid={`player-name-${index}`}>{player.name}</span></p>
            <p>Score: <span data-testid={`player-score-${index}`}>{player.score}</span></p>
            <img src={player.picture} alt="Player" />
          </div>,
        )}
        <Link to="/" onClick={clearPlayer}>
          <button data-testid="btn-go-home">Voltar ao Login</button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
