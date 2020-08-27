import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Settings extends Component {
  render() {
    const { pName, pEmail, gGravatar } = this.props;
    const token = localStorage.getItem('token');

    return (
      <div>
        <h1 data-testid="settings-title">Settings</h1>
        <img src={gGravatar} alt="gravatar" />
        <h3>Nome: {pName}</h3>
        <h3>Email: {pEmail}</h3>
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
  pName: state.loginReducer.name,
  pEmail: state.loginReducer.email,
  gGravatar: state.loginReducer.gravatar,
});

Settings.propTypes = {
  pName: PropTypes.string.isRequired,
  pEmail: PropTypes.string.isRequired,
  gGravatar: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Settings);
