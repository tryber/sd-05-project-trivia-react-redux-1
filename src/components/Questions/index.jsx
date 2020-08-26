import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import resolveQuestion from '../../services/apiQuestions';
import Button from './Button';
import './style.css';

class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      respostaAPI: [],
    };
  }

  componentDidMount() {
    const { token } = this.props;
    resolveQuestion(token).then((data) =>
      this.setState({
        respostaAPI: data.results,
      }),
    );
  }


  render() {
    const { respostaAPI } = this.state;
    if (respostaAPI.length < 1) return <h1>Loading...</h1>;

    return (
      <div>
        <Button respostaAPI={respostaAPI} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.tokenReducer.data.token,
});

Questions.propTypes = {
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Questions);
