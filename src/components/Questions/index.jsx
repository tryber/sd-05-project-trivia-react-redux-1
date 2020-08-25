import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { Redirect } from "react-router-dom";
import resolveQuestion from '../../services/apiQuestions';

class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 30,
      index: 0,
      disabled: false,
      respostaAPI: [],
    };

    this.handleClick = this.handleClick.bind(this);
    this.criarPerguntas = this.criarPerguntas.bind(this);
    this.toggleClass = this.toggleClass.bind(this);
  }

  componentDidMount() {
    resolveQuestion().then((data) =>
    this.setState({
      respostaAPI: data.results,
    })
    )
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
      (pergunta, index) => ({
        pergunta,
        isCorreta: false,
        index,
      })
    );

    const allQuestions = [...perguntasErradas, perguntasCertas];
    const respostas = shuffle(allQuestions);
    return respostas;
  }

  render() {
    let shuffledQuestions = [];
    const { index, disabled, respostaAPI } = this.state;
    if (respostaAPI == '') return <h1>Loading...</h1>;
    if (respostaAPI.length > 0) {
      shuffledQuestions = this.criarPerguntas();
    }
    console.log(respostaAPI)
    return (
      <div>
        <span data-testid="question-category">
          {respostaAPI[index].category}
        </span>
        <p data-testid="question-text">{respostaAPI[index].question}</p>
        {shuffledQuestions.map((question) => (
          <button
            type="button"
            data-testid={
              question.isCorreta
                ? "correct-answer"
                : `wrong-answer-${question.index}`
            }
            className={
              disabled
                ? question.isCorreta
                  ? "green-border"
                  : "red-border"
                : ""
            }
            onClick={this.toggleClass}
            disabled={disabled}
          >
            {question.pergunta}
          </button>
        ))}
        <button disabled={!disabled} type="button" onClick={this.handleClick}>
          Next
        </button>
        {index >= 4 && <Redirect to="/ranking" />}
      </div>
    );
  }
}

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Questions;
