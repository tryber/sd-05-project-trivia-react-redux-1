import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { resolverToken as token } from './redux/actions';

import './App.css';
import Rotas from './routes';

class App extends React.Component {

  async componentDidMount() {
    await this.props.getToken();
  }

  tokenLocalStorage(){
    localStorage.setItem('token', this.props.token);
  }

  render() {
    const { isLogged } = this.props;
    this.tokenLocalStorage();

    return (
      <div className="App">
      {!isLogged && <Redirect to="/" />}
        <header className="App-header">
          <Rotas />
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.tokenReducer.data.token,
  isLogged: state.loginReducer.isLogged,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(token()),
});

App.propTypes = {
  getToken: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
