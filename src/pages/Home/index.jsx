import React, { Component } from "react";
import { connect } from "react-redux";
import { dispatchQuestions } from "../../redux/actions/actionQuestions";
import Header from "../../components/Header";
import Questions from "../../components/Questions";

class Home extends Component {
  componentDidMount() {
    this.props.getQuestions();
  }

  render() {
    const { questions } = this.props;
    localStorage.setItem('questions', questions.results);
    
    return (
      <div>
        <Header />
        <Questions />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionsReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(dispatchQuestions()),
});

export default connect(mapStateToProps,mapDispatchToProps)(Home);
