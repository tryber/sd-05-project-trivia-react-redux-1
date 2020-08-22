import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Settings extends Component {
  render() {
    const { name, email, gravatar } = this.props.login;
    const token = localStorage.getItem('token');

    return (
      <div>
        <h1 data-testid="settings-title">Settings</h1>
        <img src={gravatar} alt="gravatar" />
        <h3>Nome: {name}</h3>
        <h3>Email: {email}</h3>
        <h3>
          Token:
          {!token && 'Nao definida'}
          {token && token}
        </h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.loginReducer,
});

Settings.propTypes = {
  login: PropTypes.object,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  gravatar: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Settings);
