import React from 'react';
import { connect } from 'react-redux';
import { resolverToken as token } from './redux/actions';
import logo from './trivia.png';
import './App.css';
import PropTypes from 'prop-types';

class App extends React.Component {

  componentDidMount() {
    const { getToken } = this.props;
    getToken();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Sua vez
          </p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token.data.token,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(token()),
});

App.PropTypes = {
  getToken: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
