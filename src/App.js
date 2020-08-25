import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resolverToken as token } from './redux/actions';

import './App.css';
import Rotas from './routes';

class App extends React.Component {

  async componentDidMount() {
    await this.props.getToken();
  }

  tokenLocalStorage() {
    localStorage.setItem('token', this.props.token);
  }

  render() {
    this.tokenLocalStorage();

    return (
      <div className="App">
        <header className="App-header">
          <Rotas />
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.tokenReducer.data.token,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(token()),
});

App.propTypes = {
  getToken: PropTypes.func.isRequired,
};

App.defaultProps = {
  token: ''
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
