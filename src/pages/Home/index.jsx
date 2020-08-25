import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dispatchQuestions } from '../../redux/actions/actionQuestions';
import Header from '../../components/Header';
import Questions from '../../components/Questions';

class Home extends Component {
  componentDidMount() {
    this.props.getQuestions();
  }

  render() {

    return (
      <div>
        <Header />
        <Questions />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(dispatchQuestions()),
});

Home.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  getQuestions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
