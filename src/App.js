import React from 'react';
import logo from './trivia.png';
import './App.css';
import { connect } from 'react-redux';
import { resolverToken as token } from './redux/actions';

class App extends React.Component {

  componentDidMount() {
    const { getToken } = this.props;
    console.log(getToken())
  }

  render () {
    const { token } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {token}
          </p>
        </header>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.token.data.token
})

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(token()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
