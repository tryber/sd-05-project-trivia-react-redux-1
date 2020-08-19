import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resolverToken as token } from './redux/actions';
import logo from './trivia.png';
import './App.css';

class App extends React.Component {

  componentDidMount() {
    this.props.getToken();
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
  getToken: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
