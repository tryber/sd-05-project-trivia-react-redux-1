import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import resolveQuestion from '../../services/apiQuestions';
import './style.css';

function classChoose(disabled, isCorreta) {
  let classe = '';
  if (disabled && isCorreta) {
    classe = 'green-border';
  } else if (disabled && !isCorreta) {
    classe = 'red-border';
  } else {
    classe = '';
  }
  return classe;
}
class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 30,
      index: 0,
      disabled: false,
      className: '',
      respostaAPI: [],
    };

    this.handleClick = this.handleClick.bind(this);
    this.criarPerguntas = this.criarPerguntas.bind(this);
    this.toggleClass = this.toggleClass.bind(this);
  }

  componentDidMount() {
    const { token } = this.props;
    resolveQuestion(token).then((data) =>
      this.setState({
        respostaAPI: data.results,
      })
    );
  }

  handleClick() {
    const { index, disabled } = this.state;
    if (index < 4) {
      this.setState({
        index: index + 1,
        disabled: !disabled,
      });
    }
  }

  toggleClass() {
    this.setState({
      disabled: true,
    });
  }

  criarPerguntas() {
    const { respostaAPI } = this.state;
    const { index } = this.state;

    const shuffle = (array) => array.sort(() => Math.random() - 0.5);

    const perguntasCertas = {
      pergunta: respostaAPI[index].correct_answer,
      isCorreta: true,
    };

    const perguntasErradas = respostaAPI[index].incorrect_answers.map(
      (pergunta, indexs) => ({
        pergunta,
        isCorreta: false,
        index: indexs,
      }),
    );

    const allQuestions = [...perguntasErradas, perguntasCertas];
    const respostas = shuffle(allQuestions);
    return respostas;
  }

  render() {
    let shuffledQuestions = [];
    const { index, disabled, respostaAPI, time } = this.state;
    if (respostaAPI.length < 1) return <h1>Loading...</h1>;
    if (respostaAPI.length > 0) shuffledQuestions = this.criarPerguntas();
    return (
      <div>
        <span data-testid="question-category">
          {respostaAPI[index].category}
        </span>
        <p data-testid="question-text">{respostaAPI[index].question}</p>
        {shuffledQuestions.map((question) => (
          <button
            key={Math.random(99999999)} type="button"
            data-testid={
              question.isCorreta ? 'correct-answer' : `wrong-answer-${question.index}`
            }
            className={classChoose(disabled, question.isCorreta)}
            onClick={this.toggleClass} disabled={disabled}
          >
            {question.pergunta}
          </button>
        ))}
        {disabled && (
          <button disabled={!disabled} type="button" onClick={this.handleClick}> Next </button>
        )}
        {time}
        {index >= 4 && <Redirect to="/ranking" />}
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
