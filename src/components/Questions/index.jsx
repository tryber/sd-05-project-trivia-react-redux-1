import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Ranking from '../../components/Ranking';
import './style.css';

class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 30,
      index: 0,
      respostas: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.criarPerguntas = this.criarPerguntas.bind(this);
  }

  handleClick() {
    const { index } = this.state;
    if (index <= 4) {
      this.setState({
        index: index + 1,
      });
    }
  }

  criarPerguntas() {
    const { questions } = this.props;
    if(!questions.results) {
      return <h1>Loading...</h1>;
    }
    const { index } = this.state;

    const shuffle = (array) => array.sort(() => Math.random() - 0.5);

    const perguntasCertas = {
      pergunta: questions.results[index].correct_answer,
      isCorreta: true,
    };

    const perguntasErradas = questions.results[index].incorrect_answers.map((pergunta) => ({
      pergunta,
      isCorreta: false,
    }));

    const allQuestions = [...perguntasErradas, perguntasCertas];

    const respostas = shuffle(allQuestions);

    return respostas;
  }

  render() {
    const { questions } = this.props;
    const { index } = this.state;
    if (!questions.results) {
      return <h1>Loading...</h1>;
    }

    const respostass = this.criarPerguntas();

    return (
      <div>
        <span data-testid="question-category">{questions.results[index].category}</span>
        <p data-testid="question-text">{questions.results[index].question}</p>
        {respostass.map((question) => <button>{question.pergunta}</button>)}
        <button type="button" onClick={this.handleClick}>Next</button>
        {(index >= 4) && <Ranking />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
});

Questions.propTypes = {
  questions: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(Questions);
