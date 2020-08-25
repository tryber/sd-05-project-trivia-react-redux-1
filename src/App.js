import React from 'react';
import { connect } from 'react-redux';

import './App.css';
import Rotas from './routes';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Rotas />
        </header>
      </div>
    );
  }
}

export default connect()(App);
